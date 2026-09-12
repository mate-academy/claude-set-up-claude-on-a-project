# NOTES.md

## CLAUDE.md

I kept it to four short parts: a one-line description, the commands I actually run (`npm run dev`, `npm test`, `npm run lint`, plus how to run a single test file), the real architecture (entry point → per-resource routers → `db/store.js` for data access, and the test-import pattern where `server.js` exports `app` unstarted), and two conventions (error response shape, and always going through `db/store.js` instead of touching data inline).

I left out the course README's task checklist, `.env` setup steps, and CI details — those are either one-off instructions for finishing this assignment or easily discoverable by reading the files themselves. I also didn't restate anything ESLint already enforces, since that's not something Claude needs told twice.

## Permissions

`.claude/settings.json` (committed):
- **allow** `Bash(npm test:*)` — the test command is safe and I run it constantly; no reason to confirm every time.
- **deny** `Read(./.env)` — without this, Claude could read real secrets (API keys, DB credentials) straight out of the file and potentially echo them into a response or a commit message.
- **deny** `Bash(git push --force:*)` — force-push can silently overwrite teammates' commits on a shared branch with no easy recovery. This is exactly the kind of destructive, hard-to-reverse action that shouldn't be one approval away.
- **ask** `Bash(git push:*)` — a normal push is reversible and low-risk, but it's still a public action (visible to collaborators, triggers CI), so I want a chance to glance at what's being pushed each time rather than blanket-allowing it.

`.claude/settings.local.json` (personal, git-ignored) has the same rules for my own machine — it's not part of the PR.
