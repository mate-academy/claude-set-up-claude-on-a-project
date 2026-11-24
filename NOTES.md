# NOTES

## CLAUDE.md

I kept four parts: a one-line description, commands, architecture and conventions.

- Commands include how to run one test file or filter by name. Claude can't easily guess these.
- Architecture explains that `server.js` only calls `listen()` when run directly, so tests import `app` without a port. It also says `db/store.js` is the only data layer.
- Conventions are "use X, not Y" rules: CommonJS not ES modules, `node:test` not Jest, the `{ error }` format with correct status codes, `Number(req.params.id)`, and no dotenv.

I removed:
- the generic "This file provides guidance..." line, because it gives Claude nothing useful;
- "data resets on restart", because "in-memory" already says it;
- "double quotes and semicolons", because the code and ESLint already show it.

There are no secrets or one-off tasks in the file.

## Permissions

- **allow**: `npm test` and `npm run lint`. They are safe and I run them often, so Claude doesn't need to ask.
- **ask**: `git push`. I want to check what goes to GitHub first.
- **deny**: reading `.env` and `git push --force`.

Without the deny rules, Claude could read real secrets from `.env` and show them in the chat, or force-push and delete commits on the remote branch.

## Verification

In a fresh session, `/memory` showed `CLAUDE.md` as loaded, and `/permissions` showed my allow, ask and deny rules. When I asked "How do I run the tests here?", Claude answered from `CLAUDE.md`.