# NOTES.md

## CLAUDE.md choices

**Kept:**

- The one-line description — tells Claude what the project is at a glance.
- `npm run dev`, `npm test`, and `npm run lint` — the only three commands you run during normal development; Claude needs these to verify changes without asking.
- Two structural conventions: route-per-resource and all data access through `db/store.js`. These are the rules most likely to be violated by a model that hasn't read the code, so they earn their place.
- A module-system note (CommonJS, not ESM) — easy to get wrong, easy to state.
- The architecture section: the `require.main` guard in `server.js` is non-obvious and directly relevant to how tests work.

**Left out:**

- The seed data in `db/store.js` (Ada Lovelace, Alan Turing) — derivable from reading the file.
- Port configuration (`process.env.PORT || 3000`) — standard Express boilerplate, not a project-specific rule.
- Dependency versions — those live in `package.json`.
- Any one-off setup steps — not useful after the first run.

## Permission rules

**Allow** — `npm test`, `npm run lint`, `npm run dev` run constantly during development and have no side effects outside the repo; auto-approving them removes friction without risk.

**Ask** — `git push` affects the remote and is irreversible without a force-push; I want to confirm each push but not block it entirely.

**Deny** — `Read(./.env)` prevents Claude from reading secrets even if asked. `git push --force` is denied outright: a force-push to a shared branch can destroy teammates' work and is never something I want to happen automatically.
