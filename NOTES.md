# Notes

## CLAUDE.md

**Included:**
- A one-line description of the project (Express API + in-memory store).
- The three commands actually used day to day: `npm run dev`, `npm test`, `npm run lint`, plus how to run a single test file.
- Architecture: the role of `server.js` as entry point, one router per resource in `routes/`, and `db/store.js` as the only place that touches the `users` data.
- Two conventions that aren't obvious from skimming one file: routes must go through `db/store.js` rather than touching data directly, and the ESLint `no-unused-vars` exemption for `req`/`res`/`next`/`_`-prefixed args.

**Left out, and why:**
- The course task instructions from the README (branch naming, submission steps, Definition of Done) — that's meta-process for the student, not something Claude needs to do the work.
- A file-by-file directory listing — it's discoverable by reading the repo and would just go stale.
- Anything about `.env` / secrets handling — there are none in this starter, and it's already covered by `.gitignore` and the deny rule below.
- Generic advice like "write tests" or "handle errors" — not project-specific, so it doesn't belong here.

## Permissions (`.claude/settings.json`)

- **allow**: `Bash(npm test:*)`, `Bash(npm run lint:*)` — safe, non-destructive, run constantly; no reason to prompt every time.
- **ask**: `Bash(git push:*)` — pushes affect the shared remote, so a quick confirmation before every push is worth the friction.
- **deny**: `Read(./.env)`, `Bash(git push --force:*)`.

**Without the deny rules:**
- `Read(./.env)`: nothing stops Claude from reading real secrets (API keys, DB credentials) into context if a `.env` ever existed, and from there they could end up quoted back in chat output, logs, or a commit/PR description.
- `Bash(git push --force:*)`: a force-push can silently overwrite commits on the shared branch/remote (someone else's work, or history the team needs), and it's not something you can undo once others have pulled.
