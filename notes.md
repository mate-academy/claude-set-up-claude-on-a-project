# Notes

## CLAUDE.md

The `/memory` command opens the existing project file for editing; no new content was added to it in this session. It currently documents:
- Commands (`npm run dev`, `npm test`, `npm run lint`)
- Architecture (`server.js`, `routes/`, `db/store.js`, `tests/`)
- Conventions (ESLint unused-vars exceptions, `.env` handling)

## Permissions

Added in commit `bc45693` ("Add Claude Code permission rules") to `.claude/settings.json`:
- **Allow:** `npm test`, `npm run lint` (safe/frequent commands run without prompting)
- **Ask:** `git push` (confirmation required before pushing)
- **Deny:** reading `.env`, and `git push --force` (blocked outright)

Run `/permissions` to view these rules.
