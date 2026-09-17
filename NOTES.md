# NOTES.md

Rationale for the CLAUDE.md and `.claude/settings.json` choices made when setting up Claude Code for this project.

## CLAUDE.md

**Included:**
- The exact commands (`npm run dev`, `npm test`, `npm run lint`)
- The conventions that break the design or CI if ignored: CommonJS only, reads/writes go through `db/store.js`, errors use the `{ error: "message" }` shape, URL prefix lives in `server.js`
- The `require.main === module` guard that lets tests run without binding a port

**Excluded:** the file tree, dependencies, and anything ESLint already enforces — Claude reads those faster than prose about them, and stale prose contradicts the code.

## Permission rules

**Configured** (verified against `.claude/settings.json`):
- Allow `Bash(npm test:*)` — safe and constant, so it never prompts
- Ask on `Bash(git push:*)`
- Deny `Read(./.env)` and `Bash(git push --force:*)`

**Why:** without the `.env` deny, Claude could open it while debugging config and put real secrets in the transcript. Without the force-push deny, one command could overwrite commits that exist only on the remote.
