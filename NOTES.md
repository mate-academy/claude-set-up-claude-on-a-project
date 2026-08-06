# Notes on the Claude Code setup

## What went into CLAUDE.md (and what didn't)

**Kept:** the one-line project summary, the three npm scripts with their quirks (`--watch`, `--test`), and the conventions that Claude cannot infer from the code alone — CommonJS over ESM, the "one route file per resource" pattern, the `db/store.js` seam, and the expected HTTP status codes. The architecture section names the *why* of `server.js` starting the listener only when run directly (so tests can import `app`), which is not obvious from reading the file.

**Cut:** anything derivable in one grep — that this is Node.js/Express, the full folder listing, the sample seed data, dependency versions. A CLAUDE.md that repeats `package.json` just wastes context; sharp beats complete.

## Permission rules and why

- **allow**: `npm test`, `npm run lint`, `npm run dev` — safe, run constantly during development, no reason to be interrupted for each one.
- **ask**: `git push` — I want to see and confirm every push, because a push to the wrong remote or branch is expensive to undo.
- **deny**: `Read(./.env)`, `git push --force`, `rm -rf` — the three that can silently leak secrets, rewrite history, or destroy files. Without the `.env` deny in particular, a well-meaning "help me debug this config" request could quietly pull real secrets into a session or log.

## Verification

- `/memory` in a fresh session shows `CLAUDE.md` loaded from the project root.
- `/permissions` shows the allow / ask / deny rules from `.claude/settings.json`.
- Asking "How do I run the tests here?" returns `npm test` without any extra prompting — CLAUDE.md is doing its job.
