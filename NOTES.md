# Notes

## CLAUDE.md

I included a one-line project description, the three npm commands (`dev`, `test`, `lint`), conventions Claude can follow without asking (CommonJS not ESM, one router per resource, data access only through `db/store.js`, JSON error shape, a test for every new route, the unused-arg lint rule), and a short architecture note on `server.js`, `routes/`, and `db/store.js`.

I deliberately left out things obvious from the code (the endpoint list, what Express is), the course assignment steps from the README, and anything sensitive such as `.env` contents. Shorter files get followed more reliably, so every line has to save a question or a mistake.

## Permission rules (`.claude/settings.json`)

- **Allow:** `npm test` and `npm run lint`. They are safe, read-only checks that Claude runs constantly, so prompting each time is just friction.
- **Ask:** `git push`. Pushing is outward-facing, so I want to confirm each time.
- **Deny:** reading `./.env` and `git push --force`.

Without the `.env` deny rule, Claude could read real secrets (database URLs, API keys) into the session, where they could be echoed in output or sent to a tool. Without the force-push deny rule, a mistaken command could overwrite shared branch history and destroy teammates' commits.

## Verification

I haven't yet run `/memory` or `/permissions` in a fresh session. Before submitting, confirm that `/memory` lists `CLAUDE.md` and `/permissions` shows the allow, ask, and deny rules above.
