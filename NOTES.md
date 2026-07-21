# NOTES

## CLAUDE.md

I kept it to four short sections: a one-line description, commands (`dev`, `test`, single-test, `lint`), two real conventions (CommonJS over ESM, and routes only touching data through `db/store.js`), and an architecture note explaining why `server.js` exports `app` without calling `.listen()` — that's the non-obvious bit that ties `server.js` and `tests/users.test.js` together, and it isn't discoverable without reading both files side by side.

I left out a file-by-file walkthrough of `routes/` and `db/store.js` (readable directly from the code in seconds), anything about `.env` beyond noting it's currently unused by the app, and any mention of the course/assignment itself — none of that helps a future session do the work.

## Permissions

- **Allow**: `npm test`, `npm run lint`, `npm run dev` — the three commands from `package.json` I run constantly and that can't cause damage.
- **Ask**: `git push` — I want a chance to glance at what's going out before it leaves my machine, but don't want to block on it every single time.
- **Deny**: reading `./.env` (real secrets would live there once someone adds them, and there's no reason Claude needs to read them to work on this app), `git push --force` (can silently overwrite someone else's commits on a shared branch), and `rm -rf` (irreversible; nothing in this workflow needs it).

Without the `.env` deny rule, Claude could read and potentially leak real secrets into a response or a committed file the moment someone adds a `DATABASE_URL` or API key to `.env`. Without the force-push deny rule, a routine "clean up my branch" request could destroy a teammate's unpushed work on a shared branch with no easy recovery.

## Verification

- `/memory` shows `CLAUDE.md` loaded from the project root.
- `/permissions` shows the allow/ask/deny rules above.
- Asking "How do I run the tests here?" in a fresh session answers from `CLAUDE.md` (`npm test`) without further explanation.
