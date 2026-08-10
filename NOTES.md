# Notes

## CLAUDE.md

I kept it to commands, conventions, and architecture. I left out a project description line, a licence/author section, and anything that's obvious from opening the files (e.g. "uses Express") — Claude can read `package.json` and `server.js` for that. I also left out any one-off task notes and anything from `.env.example`, since secrets/config values don't belong in a file that's read on every session.

## Permissions

- **allow**: `Bash(npm test:*)`, `Bash(npm run lint:*)` — safe, read-only-ish commands I run constantly; no reason to be asked every time.
- **ask**: `Bash(git push:*)` — pushing affects the shared remote, so I want a chance to review before it happens.
- **deny**: `Read(./.env)`, `Bash(git push --force:*)` — without the first, Claude could read real secrets out of a git-ignored file if asked to "check the env config"; without the second, a force-push could silently overwrite remote history/collaborators' work.

## Verification

- `claude --version` runs and is signed in.
- `/memory` shows `CLAUDE.md` loaded from the project root.
- `/permissions` shows the allow/ask/deny rules from `.claude/settings.json`.
- Could not run `npm test` / `npm run lint` directly in this environment (no `npm`/`node` on PATH here); the commands are documented in `CLAUDE.md` and mirror the scripts in `package.json`.