# Notes

## CLAUDE.md

I kept four short parts: a one-line description, the three commands I run (`npm run dev`, `npm test`, `npm run lint`), five conventions and a short architecture note. The conventions are rules Claude cannot safely guess from one file: CommonJS instead of ES modules, data access only through `db/store.js`, JSON `{ error }` responses with 400/404, tests with `node:test` + supertest, and never reading `.env`.

I deliberately left out things Claude can see from the code itself (the full list of endpoints, package versions, file-by-file descriptions), one-off tasks, and anything sensitive like real config values. Everything in the file is loaded into every session, so every extra line costs context and makes the important rules easier to miss.

## Permission rules

- allow: `npm test` and `npm run lint` — safe, read-only checks I run all the time, so Claude should not stop to ask.
- ask: `git push` — pushing is fine but shared, so I want to confirm each time.
- deny: reading `.env` / `.env.*` and `git push --force` / `-f`.

Without the deny rules, Claude could read real secrets from `.env` into the conversation (and from there into logs or commits), or force-push and overwrite teammates' work on the remote with no way to undo it.

## Verification

In a fresh session `/memory` showed this project's CLAUDE.md as loaded, and `/permissions` listed my allow, ask and deny rules. When I asked "How do I run the tests here?", Claude answered `npm test` from CLAUDE.md without any extra explanation.
