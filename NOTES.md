# NOTES

Summary of changes made in this folder (`claude-set-up-claude-on-a-project`), most recent first.

## 2026-07-09 — `fixing some error` (45d6dc3)
- `.claude/settings.json`: added `"mcp__computer-use__*"` to the `deny` permissions list, alongside the existing `Read(./.env)` and `Bash(git push --force:*)` denials.

## 2026-07-09 — `added CLAUDE.md and permissions` (21b8c94)
- Added `CLAUDE.md`: project documentation describing the Express API starter (`/users` + `/health` service), its commands (`npm install`, `npm run dev`, `npm start`, `npm test`), architecture (`server.js`, `routes/`, `db/store.js`, `tests/`), and conventions (thin route handlers, `400`/`404` error handling).
- Added `.claude/settings.json`: initial Claude Code permissions config — allow `Bash(npm test:*)`, ask before `Bash(git push:*)`, deny reading `.env` and force-pushing.

## Earlier history
- `Update README.md` (x3), a revert of a "Review" commit, and merges from PRs #1 and #2 — README updates and a prior `NOTES.md` were part of this earlier history (that `NOTES.md` is not present in the current tree; this file recreates it for the current state of the folder).
