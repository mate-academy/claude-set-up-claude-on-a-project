# NOTES.md

## CLAUDE.md

I kept it to four lean parts: a one-line description, the commands I actually run (`npm run dev`, `npm test`, running a single test file/pattern, `npm run lint`), two real conventions (routes stay thin and delegate to `db/store.js`; `server.js` only calls `.listen()` when run directly, so tests can import `app` without a port), and a short architecture note tying `server.js` → `routes/` → `db/store.js` → `tests/` together.

I left out anything derivable by reading the code (full file listing, every route's behavior), anything sensitive (`.env.example` contents), and generic advice like "write tests" or "handle errors" that isn't specific to this repo. Shorter felt stronger — the goal is to save Claude time, not restate the codebase.

## .claude/settings.json

- **Allow** `Bash(npm test:*)` — this is a safe, frequently-run, read-only-ish command (it doesn't touch git or the filesystem outside the project), so there's no reason to interrupt every test run for approval.
- **Ask** `Bash(git push:*)` — pushing affects a shared remote. I want a chance to review what's about to go out before it leaves my machine, but I don't want to block it outright since it's a normal part of the workflow.
- **Deny** `Read(./.env)` — `.env` would hold real secrets in a non-starter project. Without this rule, Claude could read and potentially echo secret values into its context or output (e.g. while debugging config), which risks leaking them into logs, transcripts, or a shared session.
- **Deny** `Bash(git push --force:*)` — a force-push can silently overwrite or delete commits on a shared branch. Without this rule, a single mistaken or overly-agentic force-push could destroy another contributor's work with no easy way back.

## Verification

- `/memory` shows `CLAUDE.md` loaded.
- `/permissions` shows the allow/ask/deny rules above.
