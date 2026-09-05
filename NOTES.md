# NOTES

## CLAUDE.md

Kept four sections: a brief project description, commands (`npm run dev`, `npm test`, `npm run lint`), conventions (one route file per resource, data access only through `db/store.js`, the unused-lint-parameter rule) and architecture (entry point `server.js`, the `require.main === module` pattern for tests, in-memory storage).

Deliberately left out:
- A retelling of file contents that's already visible from the code (the full `routes/` structure, all of `db/store.js`).
- Generic development advice ("write tests", "handle errors") — not specific to this project.
- Secrets and the contents of `.env.example` — no reason to copy them into a file Claude reads every session.
- One-off course tasks — already covered in `README.md`, no point duplicating.

## .claude/settings.json

- **allow**: `npm test`, `npm run lint` — side-effect-free commands I run often; don't want to confirm every time.
- **ask**: `git push`, `Edit`, `Write` — want to see exactly what's being pushed before it goes to the remote repo, and confirm every file change/creation before it lands.
- **deny**: reading `.env` and `git push --force`.
  - Without the `.env` deny, Claude could read a file with real secrets (e.g. `DATABASE_URL`) and accidentally quote it in a response or logs.
  - Without the `git push --force` deny, there's a risk Claude overwrites someone else's commits on a remote branch with no way to roll back.
- **fileCheckpointingEnabled**: `true` — snapshots files before edits so `/rewind` can restore them if a change needs to be undone.

## Verification

- `/memory` shows `CLAUDE.md` as loaded.
- `/permissions` shows the allow/ask/deny rules from `.claude/settings.json`.
