# Notes on Claude Code setup

## CLAUDE.md
I included a one-line description of the project, the commands I run most often (install, dev, start, test, lint), a short architecture note (server.js entry point, one route file per resource, all data access going through db/store.js), and two conventions (quote/semicolon style, and the ESLint rule for unused variables).

I left out anything Claude could already work out by reading the code itself (like the full file structure) and anything sensitive (no real config values or secrets). Keeping it short means Claude reads useful context every session without wasting time or tokens on things it doesn't need explained.

## Permissions
I added an allow rule for `npm test`, since it's safe and something I run constantly. I added a deny rule for reading `.env` and for force-pushing, and an ask rule so Claude checks with me before every git push.

Without the deny rule, Claude could read `.env` and expose real secrets (like API keys) in its output, or force-push and overwrite commit history on a shared branch — both are hard to undo, so blocking them outright is safer than relying on it to ask first.
## Verification
I ran /memory to confirm CLAUDE.md loads, and /permissions to confirm my rules are active.
