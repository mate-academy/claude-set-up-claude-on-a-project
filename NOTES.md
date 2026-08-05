# NOTES.md

## CLAUDE.md

I kept it to four short sections: a one-line description, commands, conventions, and architecture.

What I left out:
- Anything derivable by reading the code directly (e.g. quote style, indentation, the exact ESLint unused-vars pattern) — Claude can see that by opening a file, so writing it down just adds a line to go stale.
- One-off or task-specific notes (this course assignment, the PR checklist in README.md) — those belong to a single session, not to standing project guidance.
- Anything sensitive — there's nothing secret in this starter app, but in general secrets/config values don't belong in a file every session loads.

What I kept and why:
- The `server.js` conditional `app.listen` note — it's not obvious from a glance why `require.main === module` is there, and it explains why tests can `require("../server")` safely.
- The in-memory, non-persistent nature of `db/store.js` — easy to assume there's a real database otherwise, and that assumption would lead to wrong suggestions (e.g. "add a migration").
- The CommonJS-not-ESM and router-per-file rules — real "do X not Y" conventions that shape how Claude should write new code, not just descriptive trivia.

## Permissions (.claude/settings.json)

- **allow**: `npm test`, `npm run lint`, `npm run dev` — the commands I run constantly during this kind of work. Without allowing these, every single one would trigger a prompt, which defeats the point of having Claude run them.
- **ask**: `git push` — visible to others (a shared remote), so I want a chance to glance at what's being pushed each time, but it's not destructive enough to flat-out deny.
- **deny**: `Read(./.env)` and `Bash(git push --force:*)`.
  - Without the `.env` deny rule, Claude could read real secrets (API keys, DB credentials) straight into context and potentially echo them back in output, logs, or a committed file.
  - Without the force-push deny rule, Claude could silently rewrite shared branch history — overwriting a teammate's commits with no easy way back.
