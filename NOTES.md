# Notes

## CLAUDE.md

I added three sections: **Commands** (dev server, tests, running a single test, lint, and the CI requirement that lint and tests both pass), **Conventions** (CommonJS, one router per resource, data access only through `db/store.js`, JSON error format and status codes, converting route params to numbers, and the testing stack), and **Architecture** (the exported `app` and its `require.main` guard, the shared in-memory store, and how config is handled).

I left out design elements, because they haven't been defined for this project yet. I also left out anything obvious from the code, one-off tasks, and secrets.

## Permissions

`.claude/settings.json` sets these rules:

- **allow** `Bash(npm test:*)`: tests are safe and run often, so they don't need a prompt.
- **ask** `Bash(git push:*)`: pushing is outward-facing, so Claude has to confirm first.
- **deny** `Read(./.env)`: without it, Claude could read real secrets and leak them into the conversation or into files.
- **deny** `Bash(git push --force:*)`: without it, a force push could overwrite shared history and lose other people's work.

## Verification

- `/memory` shows the project `CLAUDE.md` loaded.
- `/permissions` lists the allow, ask, and deny rules above.
