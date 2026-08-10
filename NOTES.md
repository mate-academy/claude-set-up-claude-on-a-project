# Setup Notes

## 1. CLAUDE.md contents

Included:
- **Project summary** — minimal Express REST API (course starter), `/health` + `/users` on an in-memory store.
- **Commands** — install/dev/start/test/lint, plus how to run a single test file.
- **Architecture** — role of `server.js`, `routes/`, `db/store.js`, `tests/`, and why `server.js` exports `app` without calling `.listen()` (so tests can use `supertest` without a real port).
- **Conventions** — error responses as `{ error: "..." }` with proper status codes; all data access routed through `db/store.js`.

Left out (deliberately):
- **Code-level details derivable by reading the code** — exact route signatures, field names, in-memory data shape. Claude can read `routes/` and `db/store.js` directly; duplicating that in prose just goes stale.
- **Deployment/CI/infra info** — this is a course starter with no deployment story yet, so there's nothing real to document.
- **Git/PR workflow conventions** — not established for this project yet; premature to prescribe one.

## 2. Permission rules

In `.claude/settings.json`:
- **allow**: `Bash(npm test)` — run the test suite without a prompt each time.
- **ask**: `Bash(git push*)` — pushes need a confirmation, since they affect the shared remote.
- **deny**: `Read(./.env)`, `Bash(git push --force*)`.

Without the deny rules:
- No `Read(./.env)` deny → Claude could read local secrets (API keys, credentials) into context and potentially leak them into output, logs, or a shared conversation.
- No `Bash(git push --force*)` deny → a force push could silently overwrite/discard remote commits (including teammates' work), and the `ask` rule on plain `git push*` wouldn't necessarily catch a `--force` variant as a separate, more dangerous case.

## 3. Verification

Setup was verified interactively:
- `/memory` confirmed CLAUDE.md loads correctly as the project's memory file.
- `/permissions` confirmed the allow/ask/deny rules above are registered as configured.
