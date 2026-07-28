# NOTES

## CLAUDE.md

I included a one-line description, the commands I run most (`dev`, `test`, `lint`, and how to run a single test file), a few real conventions taken from the code (CommonJS not ES modules, one route file per resource, all data access through `db/store.js`, converting ids with `Number()`), and a short architecture note explaining the `server.js → routes/ → db/store.js` flow and the `require.main === module` guard that makes the app testable.

I left out the file-tree listing (Claude can discover that on its own), the dependency versions, and the course/setup steps from the README — those are one-off instructions, not guidance for working in the code.

## Permission rules

- **allow** `Bash(npm test:*)` — the test command is safe and I run it often, so approving it every time is just friction.
- **ask** `Bash(git push:*)` — pushing is fine but I want a chance to confirm before anything goes to the remote.
- **deny** `Read(./.env)` — keeps Claude from reading local secrets.

Without the deny rule, Claude could open `.env` and pull real secrets into the conversation, where they might end up echoed in output or a commit. Denying the read keeps those values out of the session entirely.
