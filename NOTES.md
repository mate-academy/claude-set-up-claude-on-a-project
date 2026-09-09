# NOTES.md

## CLAUDE.md Content

I included:
- **Commands** that Claude needs to run frequently: `npm test` (most common), `npm run lint`, and how to run a single test file (common during development)
- **Architecture** focused on the key pattern: data access goes through `store.js`, not directly from routes. Also explained that `server.js` conditionally starts the server so tests can import `app` without binding a port — this is important to understand why tests work
- **Conventions** as specific rules Claude can follow: validate POST inputs, return proper error codes, use the store layer

I deliberately left out:
- File-by-file structure (can be discovered by reading the code)
- Dependencies list (visible in `package.json`)
- The `/health` endpoint details (simple enough to see in code)
- Generic practices like "write tests" or "handle errors gracefully"

## Permission Rules

**Allow rules:**
- `npm test` — tests are safe to run; Claude should verify changes with tests often
- `npm run lint` — linting catches style issues without risk
- `npm install` — safe and often needed when dependencies change

**Ask rules:**
- `git push` — Claude should confirm before pushing to the remote; allows me to review what's being pushed
- `npm run dev` — starts a server; I want to approve this since it uses a local port

**Deny rules:**
- `Read(./.env)` / `Edit(./.env)` — the `.env` file will contain secrets (API keys, database credentials); Claude should never access it
- `git push --force` — destructive; can overwrite upstream history and lose work
- `git reset --hard` — destructive; discards uncommitted changes without recovery

Without the deny rules, Claude could accidentally expose secrets or destroy work with a force-push. The test command being allowed saves time during active development.

## Claude Code Environment

Verified during setup:
- **claude --version**: Haiku 4.5 (claude-haiku-4-5-20251001), knowledge cutoff February 2025
- **/memory**: Memory system available at `C:\Users\rosen\.claude\projects\C--Users-rosen-Learning-Claude-Code-claude-set-up-claude-on-a-project\memory\` with persistent file-based storage across sessions
- **/permissions**: Permissions configured in `.claude/settings.json` with allow/ask/deny rules for npm, git, and file access as documented above
