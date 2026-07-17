# NOTES.md

## CLAUDE.md

I kept it to four things: a one-line description, the three npm scripts (dev/test/lint) plus how to run a single test file, an architecture summary (entry point, per-resource routers, the in-memory store, test layout), and two conventions (route through `db/store.js`, config via env vars). I left out a file-by-file listing of `routes/` and `db/` since that's discoverable by reading the code, and left out anything about the course/assignment itself since that context won't matter once this stage is done.

## Permissions

- **Allow**: `npm test` and `npm run lint` — read-only, run constantly, safe to auto-approve.
- **Ask**: `git push` — not destructive by itself, but visible to others once pushed, so I want a chance to review first.
- **Deny**: reading `.env` and `git push --force` — `.env` is where real secrets would live even though this starter doesn't use any yet, and force-push can silently overwrite someone else's commits on a shared branch. Without the deny rule, Claude could read a secret into context and repeat it back later, or force-push over work that hasn't been merged yet.
