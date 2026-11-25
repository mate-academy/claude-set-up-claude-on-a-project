# Notes

## CLAUDE.md: what is in and what is out

**Included:** a one-line project description, the commands I actually run (`npm run dev`, `npm test`, a single-test-file variant, `npm run lint`), five conventions Claude can follow without asking (CommonJS only, data access only through `db/store.js`, the `{ error: "message" }` response shape, `Number()` for ids, `node:test` + `supertest` for tests), and a short architecture map (`server.js`, `routes/`, `db/store.js`, `tests/`).

**Left out:** anything Claude can read straight from the code (the list of endpoints, the contents of the store, dependency versions), the README's setup walkthrough, one-off tasks and TODOs, and anything sensitive. `.env` is only mentioned as "never read or commit"; no values, URLs or credentials are in the file. The conventions are phrased as "use X, not Y" because vague style advice does not change what Claude does.

## Permission rules (`.claude/settings.json`)

- **allow** `Bash(npm test:*)`, `Bash(npm run lint:*)`: safe, read-only checks that I want Claude to run without prompting after every change.
- **ask** `Bash(git push:*)`: pushing is visible to others, so I confirm each time.
- **deny** `Read(./.env)`, `Read(./.env.local)`: real secrets live there. `.env.example` stays readable on purpose.
- **deny** `Bash(git push --force:*)` and `Bash(git push -f:*)`: force-push rewrites shared history.

Without the `.env` deny rule, Claude could read real secrets (database URLs, API keys) into the conversation context, from where they could end up in logs, commits or generated code. Without the force-push deny rule, a mistaken or over-eager command could overwrite teammates' commits on a shared branch, and that is hard to undo. The `.gitignore` already keeps `.claude/settings.local.json` out of the repo; only the shared `settings.json` is committed.

## Verification

- `npm test` (4 of 4 pass) and `npm run lint` (clean) both run successfully, so the commands listed in `CLAUDE.md` are correct.
- `CLAUDE.md` was picked up as project context when the repo was opened in the session (its contents were loaded automatically).
- `.claude/settings.json` is valid JSON with allow, ask and deny rules.
- `/memory` and `/permissions` in a fresh interactive Claude Code session: **to be confirmed locally**, since the setup was prepared in a non-interactive environment. Expected result: `/memory` lists the project `CLAUDE.md`, and `/permissions` shows the two allow rules, the ask rule and the four deny rules above.
