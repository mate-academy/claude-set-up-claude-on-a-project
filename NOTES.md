# Notes: setting up Claude Code on this project

## What's in CLAUDE.md, and what I left out

I kept `CLAUDE.md` to the things Claude would otherwise have to work out by reading several files, or would get wrong if it guessed:

- **Commands:** `npm run dev`, `npm test`, `npm run lint`, and how to run one test (`node --test --test-name-pattern=...`). Running one test isn't written down anywhere else in the repo.
- **Conventions:** CommonJS instead of ES modules, `node:test` + `supertest` instead of Jest, the `{ error }` JSON shape with 400/404 status codes, and all data access going through `db/store.js`. Each rule says "do X, not Y", so Claude can follow it without asking. These are the places where Claude's defaults (ESM, Jest, querying data inline) wouldn't match this codebase.
- **Architecture:** why `server.js` only starts listening when run directly (so tests can import `app`), one router per resource and where to mount new ones, and two things about the in-memory store that are easy to trip on: data is shared between tests and resets on restart, and URL params arrive as strings.

I left out:

- **A file-by-file listing:** Claude can see it in one `ls`, and a copy in `CLAUDE.md` goes stale.
- **Generic advice** ("write tests", "handle errors"): it adds length without changing what Claude does.
- **The course instructions from the README:** they're one-off tasks, not lasting project rules.
- **Real config values or secrets:** I only mention that `.env` exists and is git-ignored. `CLAUDE.md` is committed and loaded into every session, so nothing sensitive belongs in it.

## Permission rules

- **Allow:** `npm test`, `node --test`, `npm run lint`, and the git commands that only read (`status`, `diff`, `log`). These are safe, repeatable commands Claude runs all the time. Allowing them means Claude can check its own changes without stopping to ask.
- **Ask:** `git push` and `npm install`. Neither is destructive, but one publishes work to the remote and the other changes dependencies and `package-lock.json`, so I want to approve each one.
- **Deny:**
  - Reading or editing `.env` / `.env.local` (and `cat .env`).
  - `git push --force` / `-f`.
  - `git reset --hard`.
  - `rm -rf`.

What could go wrong without the deny rules: Claude might read `.env` while debugging config, and real secrets would end up in the conversation, where they could be pasted, logged, or echoed into code or a commit message. A force-push could overwrite teammates' commits on the remote, and `reset --hard` or `rm -rf` could throw away local work that can't be recovered. A deny rule blocks these even if someone approves too quickly or a later session's allow rules are too broad. I left `.env.example` readable on purpose because it's a safe template and helps Claude understand the config.

The `.env` deny rules cover Claude's own file tools and the obvious `cat`. They protect against accidents, not against every possible shell command.

## Verification

- [ ] In a fresh session, `/memory` lists `./CLAUDE.md` as loaded.
- [ ] `/permissions` shows the allow / ask / deny rules from `.claude/settings.json`.
- [ ] Asking "How do I run the tests here?" gets an answer taken from `CLAUDE.md`.
