# NOTES.md

## CLAUDE.md

I kept it to the four required parts: a one-line description, the three commands I run most (`npm run dev`, `npm test`, `npm run lint`), real conventions (CommonJS only, the `{ error: "message" }` error shape with status codes, and always responding in Ukrainian), and three architecture bullets covering `server.js`, `routes/`, and `db/store.js`.

I left out the ESLint `no-unused-vars` exemption details (a one-off config note, easy to check directly in the 15-line `.eslintrc.json`), a "run a single test file" command (generic `node:test` usage, not specific to this repo), and the CI workflow description (obvious from `.github/workflows/ci.yml`). I also didn't copy in the course-assignment context from the README — that's a one-off note for me, not something Claude needs for every task. Nothing sensitive (secrets, env values, internal URLs) went in.

## Permissions

In `.claude/settings.json` I added:

- **allow**: `Bash(npm test:*)` and `Bash(npm run lint:*)` — both safe, side-effect-free, and run constantly.
- **ask**: `Bash(git push:*)` — pushes affect a shared remote, so I want a chance to review before it happens.
- **deny**: `Read(./.env)` and `Bash(git push --force:*)`.

Without the `Read(./.env)` deny, Claude could read real secrets (DB credentials, API keys) straight from `.env` and echo them into chat, a commit message, or another file — an easy way to leak credentials. Without the `Bash(git push --force:*)` deny, Claude could force-push and silently overwrite or destroy shared branch history, wiping out a teammate's commits with no easy recovery.
