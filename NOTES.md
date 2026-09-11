# NOTES.md

## CLAUDE.md

I kept it to four short parts: a one-line description, the three commands I actually run (`dev`, `test`, `lint` — including how to run a single test), and an architecture note covering the things that span multiple files: why `server.js` guards `app.listen` behind `require.main === module` (so tests can `require` the app without opening a port), why routes live one-per-resource under `routes/`, and why `db/store.js` is the single data access point.

I deliberately left out: a description of every endpoint and file (that's obvious from reading `routes/` and `db/store.js` directly), generic practices like "write tests" or "don't commit secrets" (not specific to this project), and any mention of `.env.example` or the CI workflow (they're not architectural decisions Claude needs repeated — it can read them when relevant). Nothing sensitive exists in this starter repo, but the same reasoning would apply to real secrets or config values.

## .claude/settings.json

- **Allow:** `Bash(npm test:*)` and `Bash(npm run lint:*)` — both are read-only/safe, run constantly during normal work, and don't touch anything outside the project.
- **Ask:** `Bash(git push:*)` — not destructive by itself, but it publishes commits to a shared remote, so I want a chance to confirm each time rather than have it happen silently.
- **Deny:** `Read(./.env)` and `Bash(git push --force:*)`.

Without the `Read(./.env)` deny rule, Claude could read real secrets (API keys, database credentials) straight out of a local `.env` file — for example while debugging a config issue — and then that content could end up quoted back in a response, a commit, or a generated file. Without the `Bash(git push --force:*)` deny rule, an agent could overwrite a shared branch's history in one step, silently discarding a teammate's commits with no easy way back.
