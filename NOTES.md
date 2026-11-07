# Notes: setting up Claude Code on this project

## What's in CLAUDE.md, and what I left out

`CLAUDE.md` has a one-line description, the commands I run most (`dev`, `test`, `lint`, plus how to run a single test file or filter by test name), four conventions, and a short architecture section. The conventions are the things Claude could plausibly get wrong without being told: using CommonJS instead of ES modules (ESLint enforces `sourceType: "script"`), using `node:test` + `supertest` instead of reaching for Jest, going through `db/store.js` rather than touching the data directly, and returning errors as `{ error: "..." }` with 400/404. The architecture notes cover the points that take reading several files to see: `server.js` exports `app` and only listens when run directly (which is how the tests work), a new resource needs both a route file and a mount line, and the in-memory store is shared across tests in a run.

I deliberately left out a file-by-file listing, endpoint details, and anything Claude can read straight from the code in seconds — it would only cost context and go stale. I also left out the course instructions and setup steps from the README (one-off, not useful in every session) and anything from `.env`: the file is loaded into every session and committed, so it is no place for secrets.

## Permission rules

- **Allow** `npm test`, `npm run lint`, and `node --test`: safe, read-only checks I want Claude to run freely after every change without prompting me.
- **Ask** `git push`: it publishes work to the shared remote, so I want to confirm each one.
- **Deny** reading/editing `.env`, and `git push --force` / `git push -f`.

Without the deny rules, Claude could read `.env` while exploring and pull real secrets (e.g. a `DATABASE_URL` with a password) into the conversation, where they could end up in logs, output, or a commit. A force-push could overwrite commits on the remote and destroy other people's work. Deny rules take priority over ask, so force-pushes are blocked outright even though `git push` is only an ask.

## Verification

In a fresh session, `/memory` shows `CLAUDE.md` loaded from the project root, and `/permissions` lists the allow, ask, and deny rules above. Asking "How do I run the tests here?" gets an answer taken from `CLAUDE.md`.
