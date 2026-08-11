# NOTES.md

## CLAUDE.md

**What I included:**
- Commands for the most common workflows: install, dev server, tests, lint, and how to run a single test file.
- Architecture overview explaining how `server.js`, `routes/`, and `db/store.js` relate — not obvious from reading one file alone.
- Conventions around CommonJS and the test setup, since both are non-default choices that Claude might otherwise second-guess.

**What I left out:**
- File-by-file descriptions (easily discovered by reading the code).
- Generic practices like "write tests" or "don't commit secrets" (obvious and not specific to this project).
- One-off setup steps like `git clone` (not relevant once the project is running).

## Permission Rules

**Allow:** `npm test`, `npm run lint`, `npm run dev` — these are safe, read-only or sandboxed operations that Claude should be able to run freely without interrupting the workflow.

**Ask:** `git push` — pushing to a remote affects shared state and is hard to undo, so I want to confirm it each time before it happens.

**Deny:**
- `Read(./.env)` — the `.env` file contains real secrets (API keys, database URLs). Without this rule, Claude could silently read and potentially expose those values in a response.
- `Bash(git push --force:*)` — a force-push can permanently overwrite shared history on the remote. Without this deny rule, a misguided force-push could destroy teammates' work with no easy recovery.
