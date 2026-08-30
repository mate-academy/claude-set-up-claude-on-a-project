# Notes

## What went into CLAUDE.md, and what I left out

I kept four things: a one-line description of the project, the three commands I actually run (`npm run dev`, `npm test`, `npm run lint`), three conventions written as rules Claude can follow without asking me, and a short architecture note covering the `server.js` entry point, one router per resource in `routes/`, and all data access going through `db/store.js`.

The architecture note earns its place because of one non-obvious detail: `server.js` only calls `app.listen` when run directly, which is why the tests can import `app` without opening a port. Claude would otherwise have to work that out every session.

I cut the boilerplate opening line the generator added, `npm start` and the single-test command (I do not run them often), the ESLint detail about `_`-prefixed arguments (readable straight from `.eslintrc.json`), and the note that only `PORT` is used (it will go stale). Nothing sensitive went in — no keys, no `.env` values, no one-off task instructions.

## Permission rules

- Allow `npm test` and `npm run lint`. Both are safe and read-only, and I run them many times a session. Confirming them every time is friction with no benefit.
- Ask before `git push`. Pushing is visible to other people, so one confirmation is worth it.
- Deny `Read(./.env)`, `git push --force`, and `rm -rf`.

Without the deny rule on `.env`, real secrets could be pulled into the conversation and end up in transcripts or logs, outside my control. Without the force-push and `rm -rf` rules, a single wrong command could overwrite pushed history or delete files with nothing to recover from.

## Verification

Ran `/memory` in a fresh session — CLAUDE.md shows as loaded project instructions. Ran `/permissions` — the allow, ask and deny rules are all listed. Asked "How do I run the tests here?" and Claude answered `npm test` from CLAUDE.md without reading any files.
