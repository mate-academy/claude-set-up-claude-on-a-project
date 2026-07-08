# NOTES.md

## CLAUDE.md

Kept: one-line description, Commands (`npm run dev`, `npm test`, `npm run lint`), Architecture (entry point, routes, in-memory store, tests), Conventions (CommonJS not ESM, JSON error bodies not throwing).

Left out:
- The generic `/init` boilerplate line ("This file provides guidance to Claude Code...") — adds no info, Claude already knows this.
- The teaching-repo/assignment note ("goal of current assignment is to set up CLAUDE.md, not change app code") — one-off context for this exercise, not durable project guidance.
- CI workflow details (`.github/workflows/ci.yml` steps) — derivable from the file itself, not something Claude needs restated.
- `npm start` and single-test-file command — redundant once `npm run dev` and `npm test` are listed; kept only the ones actually run often.

## Permissions (`.claude/settings.json`)

- **allow**: `Bash(npm test:*)`, `Bash(npm run lint:*)` — safe, frequently run, no side effects.
- **ask**: `Bash(git push:*)` — visible to others, want a chance to review before it happens.
- **deny**: `Read(./.env)`, `Bash(git push --force:*)` — `.env` holds secrets Claude shouldn't need to read to do its job. Force-push can silently overwrite remote history/teammates' commits.

## Verification

Ran `/memory` in a fresh session — `CLAUDE.md` shows as loaded. Ran `/permissions` — allow/ask/deny rules all show as configured.
