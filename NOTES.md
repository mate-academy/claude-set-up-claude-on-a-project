# Notes

## CLAUDE.md choices

I kept it to four short sections: a one-line description, the three npm scripts I actually run (`dev`, `test`, `lint`), two conventions (CommonJS over ESM, and routes-per-resource going through `db/store.js` rather than inline data), and a short architecture note on how `server.js`, `routes/`, and `db/store.js` fit together.

I left out anything Claude can already see by reading the code — the exact route paths and their request/response shapes, the contents of `db/store.js`, the ESLint rule details — since restating them just goes stale the moment the code changes. I also left out `.env` / config details and any one-off task notes (e.g. "next fix the users endpoint"), since those belong in an issue or a conversation, not a file Claude reloads every session.

## Permission rules

- **Allow**: `Bash(npm test:*)` and `Bash(npm run lint:*)` — both are safe, read-only-in-effect commands I run constantly and don't want to approve every time.
- **Ask**: `Bash(git push:*)` — pushing affects the shared remote, so I want a chance to glance at what's being pushed each time, but it's not scary enough to flat-out deny.
- **Deny**: `Read(./.env)` and `Bash(git push --force:*)`. Without the `.env` deny rule, Claude could read real secrets (API keys, DB credentials) straight into context and potentially leak them into a commit message, a pasted error, or a suggestion. Without the force-push deny rule, a bad `git push --force` could silently overwrite teammates' commits on a shared branch with no easy way back.

## Verification

- Started a fresh Claude Code session and ran `/memory` — confirmed `CLAUDE.md` shows as loaded.
- Ran `/permissions` — confirmed the allow/ask/deny rules above are listed.
- Asked "How do I run the tests here?" — Claude answered `npm test` directly from `CLAUDE.md`, without needing an explanation of the project.
