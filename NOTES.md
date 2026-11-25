# Notes

## What's in CLAUDE.md and why

I kept the four parts the course asks for: a one-line description, commands, conventions and architecture. The commands include how to run a single test file or a single test by name, because that isn't obvious from `package.json`. The conventions are rules taken from the existing code (CommonJS, `node:test` + `supertest`, data only through `db/store.js`, JSON error shape and status codes, numeric IDs). Without them, Claude might reach for ES modules or Jest, or edit store data directly from a route. The architecture section explains things you only see by reading several files, like `server.js` exporting `app` and only calling `listen()` when run directly. It also says the in-memory store is shared across tests.

What I left out: a file-by-file list (Claude can see the files), generic advice like "write clean code", the course instructions from the README, and anything sensitive. Every line should change how Claude behaves. Otherwise it just costs context.

## Permission rules

- **Allow:** running tests and lint (`npm test`, `npm run lint`, `node --test`) and read-only git commands (`status`, `diff`, `log`). They're safe and used constantly, so prompting for them every time is just noise.
- **Ask:** `git push` and `npm install`. Pushing is outward-facing, and installing packages changes dependencies and runs third-party scripts, so I want to confirm both.
- **Deny:** reading or editing `.env`, force-push, `git reset --hard`, and `rm -rf`.

Without the deny rules, Claude could read `.env` while debugging config and copy real secrets into the chat, a commit or a log. A force-push or hard reset could wipe out commits or uncommitted work that can't be recovered.

## Verification

- `/memory` shows `CLAUDE.md` loaded: _TODO, confirm in a fresh session_
- `/permissions` shows the allow / ask / deny rules: _TODO, confirm in a fresh session_
