# Notes

## CLAUDE.md: what's in, what's out, and why

I kept it to what a reader can't just get by looking at the code: the two conventions (route data access only through `db/store.js`, return JSON error bodies instead of throwing) and a one-line architecture map (`server.js` → per-resource routers → `db/store.js`). Those are decisions, not facts — nothing in the file structure tells you *why* routes shouldn't touch the in-memory arrays directly, so that's worth stating explicitly.

I left out anything derivable by reading the repo: the list of dependencies, the exact shape of the `/users`/`/health` responses, file-by-file descriptions, and setup/install instructions. That kind of detail goes stale the moment the code changes and is one `Read`/`Grep` away regardless, so committing it to CLAUDE.md would just create a second source of truth that drifts from the real one.

## Permission rules

`.claude/settings.json` currently has:
- **allow** `Bash(npm test:*)` — running tests is safe and repetitive, so it shouldn't need a prompt every time.
- **ask** `Bash(git push:*)` — pushing affects the shared remote, so it should always get a confirmation rather than running silently.
- **deny** `Read(./.env)` — blocks reading the env file outright.

Without the deny rule, Claude could open `.env` (which typically holds secrets like DB credentials or API keys) while investigating config or debugging, and those values could end up echoed into conversation output, pasted into a commit, or otherwise leaked outside the file. The deny rule removes that path entirely instead of relying on Claude to remember not to look.
