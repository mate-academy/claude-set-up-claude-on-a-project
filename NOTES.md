# NOTES.md

## CLAUDE.md choices

I kept a one-line project description, the commands actually used day-to-day (`npm run dev`, `npm test`, running a single test file, `npm run lint`), a short architecture section (entry point, one router per resource, the `db/store.js` data-access layer, and how tests import `app` via supertest), and two real conventions pulled from the existing code (code style, and the ESLint rule that ignores unused `req`/`res`/`next`).

I left out a file-by-file listing of `routes/` and `tests/` (obvious from opening the folder), any mention of `.env.example` contents beyond "secrets go in `.env`" (no real secrets exist in this starter), and generic advice like "write tests" or "handle errors" - none of that is specific to this repo, so it would only add noise Claude doesn't need.

## Permission rules

I added `Bash(npm test:*)` and `Bash(npm run lint:*)` as allow rules since I run both constantly and they're read-only/safe. I added `Bash(git push:*)` as an ask rule so pushes always get a confirmation. For deny, I blocked `Read(./.env)` and `Bash(git push --force:*)`.

Without the `Read(./.env)` deny rule, Claude could open `.env` while debugging and echo real secrets into its output or a commit. Without the `git push --force` deny rule, Claude could force-push over a teammate's commits and silently destroy remote history.

## Verification

`CLAUDE.md` sits at the project root and `.claude/settings.json` is committed alongside it, so a fresh session should show both in `/memory` and `/permissions`. I haven't run those interactive commands myself in this session - please confirm `/memory` lists `CLAUDE.md` and `/permissions` shows the three rules above before submitting.
