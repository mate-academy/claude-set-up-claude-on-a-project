# Notes

## CLAUDE.md choices

I kept it to four short sections: a one-line description, the three npm scripts
I actually run (`dev`, `test`, `lint`), two conventions (route files talk to
the data layer only through `db/store.js`, and the codebase is CommonJS not
ESM), and a few lines on how `server.js` / `routes/` / `db/store.js` fit
together.

I left out anything Claude can already see by reading the code — the exact
shape of the `users` object, the list of endpoints, dependency versions — and
anything one-off (like "we're currently debugging X"). No secrets or env
values are mentioned; `.env.example` already documents config, so `CLAUDE.md`
doesn't repeat it.

## Permission rules

- **Allow**: `npm test` and `npm run lint` — read-only, safe to run without
  asking every time.
- **Ask**: `git push` — not destructive, but it's visible to others, so I want
  a chance to review the diff first.
- **Deny**: reading `./.env` and force-push. Without the `.env` deny rule,
  Claude could read and potentially echo real secrets (API keys, DB URLs)
  into a response or a file. Without the force-push deny rule, Claude could
  overwrite shared branch history.

## Verification

To confirm: start a fresh `claude` session in this folder, run `/memory` and
check `CLAUDE.md` shows as loaded, then run `/permissions` and check the
allow/ask/deny rules above are listed.
