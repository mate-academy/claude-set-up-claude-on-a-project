# NOTES.md

## CLAUDE.md

I kept it to four short parts: a one-line description, the three `npm` commands (`dev`, `test`, `lint`), two real conventions (data access goes through `db/store.js`; secrets live in `.env`, never `.env.example`), and an architecture note covering the entry point, the one-router-per-resource pattern, and the store layer.

I left out anything Claude can already see by opening the files — the exact route paths, the shape of the user object, the ESLint rule details, and the CI workflow steps. I also skipped generic advice ("write tests", "handle errors") since that's true of every project and doesn't help Claude act differently here. The one non-obvious thing I did call out is that `server.js` only calls `app.listen` when run directly, since that's the reason `tests/` can `require("../server")` without a real port — that would take a minute of file-reading to figure out otherwise.

## Permissions

- **Allow**: `npm test` and `npm run lint` — both are read-only/side-effect-free, run constantly during normal work, and shouldn't need a prompt every time.
- **Ask**: `git push` — pushing is visible to others (or could open a PR), so I want a chance to review before it happens, without banning it outright.
- **Deny**: reading `.env` and force-pushing. Without the `.env` deny rule, Claude could read real secrets into context the moment a `.env` file exists locally (the repo only ships `.env.example`, but a dev's real `.env` would sit right next to it). Without the force-push deny rule, a single bad `git push --force` could silently overwrite someone else's commits on a shared branch with no easy recovery.
