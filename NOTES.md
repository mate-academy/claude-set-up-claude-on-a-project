# NOTES

## CLAUDE.md

**What's in it:** a one-line project description; a **Commands** section listing `npm install`, `npm run dev`, `npm start`, `npm test`, `npm run lint`, plus how to run a single test file; an **Architecture** section covering the `server.js` entry point and the `require.main === module` testability pattern, the one-router-per-resource layout in `routes/`, and the `db/store.js` data-access indirection; and a **Conventions** section on the ESLint unused-var override and the use of `node:test`/`assert` instead of a third-party test framework.

**What I left out:** anything already obvious from reading the code (e.g. exact route paths, individual field names in the store), one-off setup notes (installing Node, fixing the PowerShell execution policy) that only mattered for my machine on one day, and anything from `.env`/`.env.example`. The goal was to keep only what would save Claude a real question in a future session — not to document the whole codebase.

## Permission rules (`.claude/settings.json`)

- **Allow:** `Run npm test` — it's read-only against the in-memory store and something I'll run constantly, so approving it every time would just be friction.
- **Deny:** `Do a git force push` and `Read .env extension files` — force-push can silently discard shared history, and `.env` may hold real secrets even though this project's is just a template. Without the deny rule, nothing would stop Claude from reading a secret into context and potentially echoing it back, or from rewriting remote history on a shared branch.
- **Ask:** `Do a git push command` — pushing is visible to others, so I want a chance to review the diff each time rather than allowing or blocking it outright.

## Verification

Confirmed via `/memory` that `CLAUDE.md` loads as project instructions, and via `/permissions` that the allow/deny/ask rules from `.claude/settings.json` all show up correctly.
