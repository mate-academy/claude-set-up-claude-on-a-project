# Notes

## What's in CLAUDE.md, and what I left out

I kept `CLAUDE.md` to the four parts the project needs: a one-line description, the commands I run most (`npm run dev`, `npm test`, `npm run lint`, plus how to run a single test file or a name-matched test), conventions, and a short architecture note. The conventions are rules Claude can follow without asking: CommonJS not ES modules (ESLint uses `sourceType: "script"`), tests use `node:test` + `supertest` against the exported `app`, data access only through `db/store.js`, and errors as `{ error }` JSON with 400/404. The architecture section covers things that take several files to piece together, like why `server.js` only calls `listen()` when run directly, and that the in-memory store is shared across tests.

I left out a list of every file and endpoint, since Claude can read those from the code. I also left out the course setup steps from the README, which are one-off tasks. Nothing from `.env` went in, so the file has no secrets.

## Permission rules

- **Allow:** `npm test`, `npm run lint`, `node --test`, and read-only git (`status`, `diff`, `log`). These are safe and run constantly, so prompting for them would just slow things down.
- **Ask:** `git push` and `npm install`. Pushing publishes work and installing changes the lockfile, so I want to confirm each time.
- **Deny:** reading or editing `.env` / `.env.local` (including `cat .env`), `git push --force` / `-f`, `git reset --hard`, and `rm -rf`. I didn't use a `.env.*` wildcard, because deny overrides allow and that would also block the harmless `.env.example`.

Without the deny rules, Claude could read real secrets from `.env` into the conversation, where they might end up in output, a commit or a log. A force-push or hard reset could also overwrite or throw away work on the branch or the remote with no easy way back.

## Verification

In a fresh `claude` session in the project folder:

- `/memory` lists `./CLAUDE.md` as loaded.
- `/permissions` shows the allow, ask, and deny rules from `.claude/settings.json`.
- Asking "How do I run the tests here?" gets `npm test` (and the single-file form) from `CLAUDE.md` without extra explanation.
