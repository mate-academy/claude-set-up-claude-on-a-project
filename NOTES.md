# NOTES

## What's in CLAUDE.md, and what I left out

I kept four short parts: a one-line description, the three commands I actually run (`dev`, `test`, `lint`), conventions, and a few lines of architecture. The conventions are the things Claude would most likely get wrong if it guessed: this is CommonJS (not ES modules), tests use `node:test` + supertest (not Jest), routes go through `db/store.js` instead of touching data directly, and errors are `{ error }` JSON with proper status codes. Each one is phrased as "do X, not Y" so Claude can follow it without asking. The architecture note covers the `server.js` entry point (and why it only listens when run directly), one router per resource in `routes/`, and the store.

I deliberately left out anything Claude can read from the code in seconds (full route list, the seed users, Express middleware details), the setup instructions from the README, and anything sensitive. No secrets or `.env` values, no long pasted docs, and no one-off tasks. Every line is something that applies to most sessions; shorter means Claude actually follows it.

## Permission rules

- **Allow:** `npm test`, `npm run lint`, `git status`, `git diff`. These are safe, read-only or local-only commands I run constantly, so approving them every time is just friction.
- **Ask:** `git push` and `npm install`. Both reach outside my machine (the remote, or the package registry and `package.json`), so I want to confirm each one.
- **Deny:** reading `.env`, `git push --force` / `-f`, `git reset --hard`, and `rm -rf`.

Without the deny rules, Claude could read `.env` and pull real secrets (database URLs, API keys) into the conversation, logs, or even a commit. A force-push could overwrite shared history on the remote, and `reset --hard` / `rm -rf` could wipe uncommitted work with no undo. Deny rules apply even if I click through approvals quickly, so they're the safety net. `.env.example` is still readable since it only holds sample values. Personal tweaks go in `.claude/settings.local.json`, which `.gitignore` keeps out of the repo.

## Verification

- `claude --version` runs, and I'm signed in.
- In a fresh session, `/memory` lists the project `CLAUDE.md` as loaded.
- `/permissions` shows the allow / ask / deny rules above from `.claude/settings.json`.
- Asking "How do I run the tests here?" got `npm test` (Node's built-in runner with supertest) straight from CLAUDE.md, without me explaining.
- `npm test` (4 passing) and `npm run lint` (clean) both pass; no app code was changed.
