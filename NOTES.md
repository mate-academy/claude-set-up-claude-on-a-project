# NOTES

## CLAUDE.md

I kept it to four things: a one-line description, the three commands I'd actually run (`dev`, `test`, `lint`), two real conventions (one route file per resource mounted in `server.js`, and all data access going through `db/store.js`), and a short architecture map of how `server.js`, `routes/`, `db/store.js`, and `tests/` fit together.

Left out on purpose:
- CI details (`.github/workflows/ci.yml`) — Claude can read that file directly when it's relevant, no need to duplicate it.
- The ESLint rule specifics — same reasoning, it's in `.eslintrc.json`.
- Anything about `.env` / secrets — the starter app doesn't use any real config, so there was nothing worth documenting, and I didn't want to invite Claude to go looking at `.env`.
- Generic advice ("write tests", "handle errors") — that's not project-specific, so it doesn't earn a line here.

## Permission rules

- **Allow**: `npm test` and `npm run lint` — safe, read-only-ish commands I want Claude to run without asking every time, since I'll be running them constantly to check its own work.
- **Ask**: `git push` — I want a chance to look at what's being pushed before it leaves my machine, but I don't want to ban it outright since it's a normal part of the workflow.
- **Deny**: reading `.env` and force-pushing. Without the `.env` deny rule, Claude could read real secrets straight into context the moment a real `.env` exists (this starter's doesn't have any, but the project will grow). Without the force-push deny rule, Claude could rewrite shared branch history and silently drop someone else's commits — much harder to recover from than a bad regular push.
