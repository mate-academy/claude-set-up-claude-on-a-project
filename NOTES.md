# Notes

## CLAUDE.md

I kept it to four lean parts: a one-line description, the commands I run most (`npm run dev`, `npm test`, `npm run lint`, plus how to run a single test file), three "use X, not Y" conventions (CommonJS not ES modules, Node's built-in test runner not Jest, config from `process.env` not hardcoded), and a short architecture note covering the `server.js` entry point, one router per resource in `routes/`, and data access through `db/store.js`.

I deliberately left out anything discoverable from the code at a glance — a full file tree, route-by-route listings, and generic Node practices — as well as the course-exercise framing and one-off setup notes. Nothing sensitive is in the file. The aim was that every line tells Claude something it couldn't trivially infer.

## Permission rules

- **allow**: `Bash(npm test:*)` and `Bash(npm run lint:*)` — safe, read-only checks I run constantly, so prompting each time is just friction.
- **ask**: `Bash(git push:*)` — pushing is outward-facing, so I want to confirm it every time.
- **deny**: `Read(./.env)` and `Bash(git push --force:*)`.

Without the deny rules, Claude could read `.env` and pull real secrets into the conversation (and any logs), or run a force-push that overwrites shared history on the remote. Denying both outright removes the risk rather than relying on me to catch it in an approval prompt.

## Verification

`/memory` shows `CLAUDE.md` loaded as a project memory, and `/permissions` lists the allow, ask, and deny rules above. `npm test` passes (4/4) after `npm install`.
