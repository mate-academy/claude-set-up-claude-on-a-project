# Setup Notes

## CLAUDE.md Choices
- **What was included:** A concise one-line summary, frequent npm commands (`dev`, `test`, `lint`), strict architectural conventions (one route file per resource, using `db/store.js` for data access), and a brief folder map.
- **What was left out:** Obvious Express boilerplate details, long explanations, and any secrets or environment values, keeping the context lean so Claude reads it quickly without noise.

## Permission Rules & Verification
- **Rules added:** Allowed `npm test` and `npm run lint` for fast feedback loops; set `git push` to `ask` for manual review before publishing; denied reading `./.env` and running `git push --force`.
- **Why deny rules matter:** Without blocking `Read(./.env)`, Claude could accidentally ingest or expose sensitive API keys/secrets into context. Without blocking `git push --force`, an automated command could overwrite remote commit history.
- **Verification:** Confirmed via `/memory` that `CLAUDE.md` is loaded and via `/permissions` that all `allow`, `ask`, and `deny` rules are active.
