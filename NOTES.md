# NOTES.md

## CLAUDE.md

**What's in it:** a one-line project description, the commands I run often (`npm run dev`, `npm test`, `npm run lint`, plus how to run a single test), an architecture summary (entry point, routes, in-memory store, tests), and two conventions (JSON error shape for route handlers, the pattern for adding a new resource).

**What I left out, and why:**
- Obvious things from the code, like the exact contents of each route file — Claude can read those directly, and repeating them just gives the file more to go stale.
- File-by-file structure listings — easily discovered with a directory listing, not worth the space.
- One-off notes about this specific course assignment (e.g. "this is for Units 1 and 2") — irrelevant to future coding sessions on this repo.
- Anything sensitive — there's nothing secret in this starter app, but I kept `.env` details (like `PORT`) out on principle since `CLAUDE.md` is committed and shared.
- Generic advice ("write tests", "handle errors") — not specific to this project, so it doesn't help Claude do anything differently here.

Shorter felt stronger: every line is either a command I'd otherwise have to repeat every session, or context that requires reading multiple files to piece together (like the `require.main === module` guard in `server.js`).

## .claude/settings.json

**Rules added:**
- **allow** `Bash(npm test:*)` — running tests is safe, frequent, and read-only with respect to the project; no need to confirm every time.
- **ask** `Bash(git push:*)` — pushing affects the shared remote, so I want a chance to review before it happens, but it's common enough that a flat deny would be annoying.
- **deny** `Read(./.env)` — blocks Claude from reading local secrets.
- **deny** `Bash(git push --force:*)` — blocks force-pushes.

**What could go wrong without the deny rules:**
- Without `Read(./.env)` denied, Claude could read real secrets (API keys, database URLs) straight out of a local `.env` file and potentially echo them into chat, logs, or a committed file — even though `.env` itself is git-ignored, the contents wouldn't be if they leaked into output.
- Without `Bash(git push --force:*)` denied, a force-push (possibly run to "clean up" a branch or resolve a conflict) could silently overwrite commits on the remote, destroying teammates' work with no easy recovery.
