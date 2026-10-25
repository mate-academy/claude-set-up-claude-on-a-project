# Notes

## What's in CLAUDE.md, and what I left out

I kept four parts: a one-line description, the commands (`dev`, `test`, running one test file or one test by name, `lint`, and the fact that CI runs lint + test), the conventions, and a short architecture section. The conventions are the rules Claude can't easily guess from one file: CommonJS only, data access only through `db/store.js`, errors as `{ error }` JSON with 400/404, tests with `node:test` + `supertest` that never call `listen()`, and converting `req.params.id` with `Number()`. The architecture notes explain why `server.js` only listens when run directly, and that the in-memory store is shared across tests, so tests can't rely on exact ids or counts.

I left out anything Claude can read straight from the code (the list of routes and fields, dependency versions), the setup steps from the README, and anything sensitive. There are no secrets or values from `.env`, only a pointer to `.env.example`. Every extra line costs context in every session, so if it isn't a rule or a non-obvious fact, it isn't there.

## Permission rules

- **allow:** `npm test`, `node --test` and `npm run lint`. They only read and check code, I run them all the time, and CI runs the same checks, so Claude can run them without asking.
- **ask:** `git push`, so nothing reaches GitHub without me confirming it.
- **deny:** reading `.env`, and force-pushes (`--force`, `-f`, `--force-with-lease`). Deny wins over ask, so a force-push is blocked even though a normal push only asks.

Without the deny rules, Claude could read real secrets from `.env` into the conversation, where they might end up in logs, commits or other tools. It could also force-push and overwrite commits on the remote that other people depend on. `.env.example` stays readable on purpose, because it only documents the variables.

## Verification

- `/memory` shows `CLAUDE.md` loaded: TODO, confirm in a fresh session
- `/permissions` shows the allow / ask / deny rules above: TODO, confirm
- Asking "How do I run the tests here?" got an answer from `CLAUDE.md`: TODO, confirm
