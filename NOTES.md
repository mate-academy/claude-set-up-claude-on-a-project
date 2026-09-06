# NOTES.md

## CLAUDE.md

I kept it to four short parts: a one-line description, the commands I actually run (`npm run dev`, `npm test`, `npm run lint`, plus how to run a single test file), a couple of real conventions (data access goes through `db/store.js`, new resources get their own file in `routes/`), and an architecture note on how `server.js`, `routes/`, and `db/store.js` fit together.

I left out the CI workflow, `.env`/`.gitignore` details, and the ESLint config internals — Claude can read those files directly when it needs them, and repeating them in `CLAUDE.md` would just be duplication that goes stale. I also left out course/README boilerplate (setup steps, submission instructions) since that's a one-off for me, not standing guidance for working in this code.

## Permission rules

- **allow**: `npm test`, `npm run lint`, `npm run dev` — these are safe, read-only-ish, and I run them constantly, so I don't want a prompt every time.
- **ask**: `git push` — pushing is easy to undo but I still want a chance to glance at what's going out before it does.
- **deny**: reading `.env` and `git push --force` — without the `.env` deny, Claude could end up reading real secrets into context (and possibly echoing them back or into a commit); without the force-push deny, a bad rebase or reset could silently overwrite shared branch history with no easy way back.
