# NOTES.md

## CLAUDE.md

I included a one-line project description, the commands I run most (`npm run dev`, `npm test`, running a single test file, `npm run lint`), the architecture (entry point → routers → in-memory store, plus how tests import the app directly), and two conventions (how to add a new resource, where config comes from).

I left out anything already obvious from reading the code — full file listings, the contents of `.env.example`, and one-off notes about this being a course exercise. No secrets or long pasted documents went in; the file stays short enough that every line pulls weight.

## Permissions (`.claude/settings.json`)

- **allow**: `Bash(npm test:*)`, `Bash(npm run lint:*)` — safe, read-only commands I run constantly; no reason to confirm every time.
- **ask**: `Bash(git push:*)` — pushing affects the shared remote, so I want a chance to review before it happens, without fully blocking it.
- **deny**: `Read(./.env)` — without it, Claude could read real secrets straight into context and potentially echo them back or into a commit.

`.claude/settings.local.json` (personal, git-ignored) is separate and untouched by this change.

## Verification

- `/memory` opens `CLAUDE.md`, confirming it's loaded as project memory in a fresh session.
- `/permissions` shows the allow/ask/deny rules from `.claude/settings.json` listed above.
