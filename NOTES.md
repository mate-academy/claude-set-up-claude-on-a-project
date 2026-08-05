# NOTES

## 1. What's in CLAUDE.md, and what I left out

I documented the commands (`npm run dev`, `npm test`, `npm run lint`), the project's conventions (one route file per resource, all data access through `db/store.js`, `server.js` exporting `app` without auto-listening so tests can import it), and the architecture (entry point, `routes/`, `db/store.js`, `tests/`). I also added an explicit constraint: this is a course exercise repo, so the task is to configure Claude Code itself (`CLAUDE.md`, `.claude/settings.json`), not to modify `server.js`, `routes/`, or `db/`.

I deliberately left out things like deployment instructions, styling/formatting rules, and a deeper API reference (e.g. full endpoint list with request/response shapes) — the app is intentionally minimal and self-explanatory from reading `routes/` and `db/store.js`, so restating that in prose would just be documentation that goes stale. I also didn't add testing conventions beyond the one command, since the existing tests in `tests/` already demonstrate the pattern (supertest against the exported `app`) clearly enough for Claude to infer it by reading one file.

## 2. Permission rules in settings.json, and the risk without the deny rule

In `.claude/settings.json` I set:
- **allow**: `Bash(npm test:*)` — run the test suite freely without a prompt each time.
- **ask**: `Bash(git push:*)` — any push requires explicit confirmation.
- **deny**: `Read(./.env)`, `Bash(git push --force:*)` — the `.env` file can never be read, and force-pushes are blocked outright.

Without the `Read(./.env)` deny rule, Claude could read the local `.env` file (which is git-ignored precisely because it may hold secrets like API keys or credentials) as part of normal exploration — e.g. while debugging config or grepping for a variable — and that content could then end up quoted back in a response or otherwise exposed. Without the `Bash(git push --force:*)` deny rule, a force-push could silently overwrite or discard commits on a shared branch, which is very hard to undo and could destroy a teammate's work. The `ask` rule on regular `git push` is a lighter safeguard: it still allows pushing, but only after explicit confirmation, since pushing affects shared state.
