# Notes: setting up Claude Code on this project

## What's in CLAUDE.md and what I left out

I kept four short sections: a one-line description, the three commands (`dev`, `test`, `lint`), conventions, and a short architecture note. The conventions are rules Claude can't safely guess from one file: CommonJS instead of ESM, `node:test` + `supertest` instead of Jest, all data access going through `db/store.js`, the `{ "error": ... }` response shape, and running lint and tests before saying a change is done. The architecture note explains why `server.js` only calls `listen()` when it's run directly. That pattern is easy to break when adding code, and breaking it makes the tests hang.

I left out anything Claude can read from the code in a second: the list of endpoints, the sample users, the dependency versions, and the ESLint rules (the linter enforces those itself). I also left out the course instructions and anything one-off, and there are no secrets. `.env` is only mentioned as something Claude must not read. A shorter file costs less context in every session and keeps the rules that matter easy to find.

## Permission rules

- **allow**: `npm test`, `npm run lint`, and read-only git (`status`, `diff`, `log`). These are safe, I run them all the time, and they're how Claude checks its own work, so asking about them every time would just slow things down.
- **ask**: `git push`, `git commit`, `npm install`. These change shared history or pull in third-party code, so I want to approve each one.
- **deny**: reading or editing `.env` (also `cat .env`), `git push --force` / `-f`, `git reset --hard`, and `rm -rf`.

Without the deny rules, Claude could read `.env` while debugging config and pull real secrets into the conversation, where they might end up in logs or a commit. It could also force-push over teammates' work or wipe uncommitted changes with `reset --hard`, and neither of those can be undone. `.env.example` is still readable on purpose because it only has placeholders and documents the config.

A side note: the repo's `.gitignore` has leading spaces on some lines (`   .env`). Git treats those spaces as part of the pattern, so `.env` is **not** actually ignored by this repo's `.gitignore`. The deny rule stops Claude from reading it, but a person could still commit it by accident. That's worth fixing in a separate change.

## Verification

- `claude --version` → `2.1.330 (Claude Code)`
- `npm test` → 4/4 pass; `npm run lint` → clean
- `/memory` in a fresh session shows `./CLAUDE.md` as loaded project memory
- `/permissions` shows the allow / ask / deny rules from `.claude/settings.json`
- When I asked "How do I run the tests here?", Claude answered `npm test` (node:test + supertest) straight from CLAUDE.md
