# Notes

## What's in CLAUDE.md, and what I left out

`CLAUDE.md` has a one-line description, the commands I use most (`npm run dev`, `npm test`, `npm run lint`, and how to run a single test), a short architecture note, and conventions taken from the code. The architecture note covers the `server.js` entry point, one router per resource in `routes/`, and all data access going through `db/store.js`. The conventions include CommonJS over ES modules, `{ error }` JSON with 400/404 status codes, converting route IDs with `Number()`, and `node:test` + `supertest` instead of Jest.

I left out anything Claude can see quickly by reading the code, like the full file list and every endpoint. I also left out generic advice, one-off tasks and anything sensitive. Shorter files load faster and are more likely to be followed.

## Permission rules, and why the deny rule matters

- **Allow** `Bash(npm test:*)`: running the tests is safe and happens all the time, so Claude shouldn't have to ask.
- **Ask** `Bash(git push:*)`: pushing is visible to others, so I want to confirm each one.
- **Deny** `Read(./.env)` and `Bash(git push --force:*)`: `.env` holds real secrets, and a force-push can wipe out shared history.

Without the deny rules, Claude could read secrets from `.env` into the conversation, or rewrite remote history with a force-push that can't easily be undone. The deny rule also wins over the broader `git push` ask rule.

## Verification

In a fresh session, `/memory` lists `CLAUDE.md` as loaded, and `/permissions` shows the allow, ask and deny rules above.
