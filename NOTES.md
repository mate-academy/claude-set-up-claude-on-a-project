# NOTES

## CLAUDE.md

I kept it to four short sections: a one-line description, the three commands I actually run (`dev`, `test`, `lint`), two conventions that aren't obvious just from reading one file (route-per-resource, and always going through `db/store.js` rather than touching the in-memory array directly), and a short architecture note on how `server.js` wires things together and why `app.listen` is gated behind `require.main === module`.

I left out: the full list of dependencies (visible in `package.json`), the exact shape of the `/users` responses (visible in `routes/users.js`), and anything about `.env` — no secrets belong in a file Claude reads by default.

## Permission rules

- **Allow**: `npm test` and `npm run lint` — safe, read-only-ish commands I want to run without a prompt every time.
- **Ask**: `git push` — reversible but visible to others, so I want a chance to check the diff first.
- **Deny**: reading `.env` and force-pushing. Without the `.env` deny rule, Claude could read real secrets into context the moment a `.env` file exists locally. Without the force-push deny rule, a bad `git push --force` could silently overwrite remote history / other people's commits.
