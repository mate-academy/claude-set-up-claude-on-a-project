# Notes

## CLAUDE.md

I kept it to four short sections: a one-line description, the commands I actually run (`dev`, `test`, `lint`), two conventions that aren't enforced by any tool (one route file per resource, all data access through `db/store.js`, matching error response shape), and a short architecture note on `server.js` / `routes/` / `db/store.js` / `tests/`.

I left out: anything already obvious from reading the code (e.g. the exact `express.json()` middleware setup), the in-memory store's implementation details, and anything from `.env.example` — no secrets, and nothing sensitive worth documenting since the store has none.

## Permissions

- **Allow**: `Bash(npm test:*)` and `Bash(npm run lint:*)` — safe, read-only-effect commands I run constantly; letting Claude run them without a prompt each time keeps the loop fast.
- **Deny**: `Read(./.env)` and `Bash(git push --force:*)` — without the first, Claude could read real secrets once a `.env` exists locally and potentially leak them into a response or commit; without the second, a force-push could overwrite someone else's work on a shared branch with no easy recovery.
- **Ask**: `Bash(git push:*)` — pushing is otherwise safe but visible to others, so I want a chance to review before it happens rather than blocking it outright.

## Verification

- `claude --version` reports `2.1.201 (Claude Code)` — installed and signed in.
- Started a fresh session in the repo; `/memory` shows `CLAUDE.md` loaded from the project root.
- `/permissions` shows the allow/ask/deny rules from `.claude/settings.json`.
- Asked "How do I run the tests here?" and Claude answered `npm test` directly from `CLAUDE.md` without needing clarification.
