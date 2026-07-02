# NOTES.md

## CLAUDE.md

I kept `CLAUDE.md` to four lean sections: a one-line description, the everyday commands
(`npm run dev`, `npm test`, `npm run lint`, plus running a single test file), the architecture
(the `server.js` entry point and its `require.main` export trick, one router per resource in
`routes/`, and data access through `db/store.js`), and the real conventions (CommonJS not ESM,
the `400`/`404`/`201` validation rules, and the ESLint `no-unused-vars` behavior).

I deliberately left out the full file-tree listing (discoverable from the repo), the `.env`
example values (sensitive and low-value), and the course/submission instructions from the
README (one-off, not useful to future sessions). The CI note earns its place because lint
failures break the build, so it's worth flagging before pushing.

## Permissions

- **allow** `npm test` and `npm run lint` — safe, run constantly, and prompting for them each
  time is pure friction.
- **ask** `git push` — I want a chance to confirm before anything leaves my machine.
- **deny** `Read(./.env)` and `git push --force`. Without the `.env` deny rule, Claude could
  read real secrets into the conversation; without the force-push deny rule, a bad `--force`
  could overwrite shared branch history that can't easily be recovered.

## Verification

- `/memory` shows `CLAUDE.md` loaded.
- `/permissions` shows the allow / ask / deny rules above.
