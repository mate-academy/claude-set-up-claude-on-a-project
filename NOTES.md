# NOTES.md

## CLAUDE.md

I included the exact commands, the four conventions that break CI or the design if ignored (CommonJS, go through `db/store.js`, the `{ error: "message" }` shape, URL prefix in `server.js`), and the `require.main === module` guard that lets tests run without binding a port. I left out the file tree, dependencies, and anything ESLint already enforces — Claude reads those faster than prose about them, and stale prose contradicts the code.

## Permission rules

Allow `npm test:*` so the safe, constant thing never prompts; ask on `git push:*`; deny `Read(./.env)` and `git push --force:*`. Without the `.env` deny, Claude could open it while debugging config and put real secrets in the transcript. Without the force-push deny, one command could overwrite commits that exist only on the remote.
