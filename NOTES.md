# NOTES

## CLAUDE.md

I kept a one-line project description, the three npm commands (plus how to run a single test file), four conventions, and a short architecture map. The conventions are the things Claude could not safely guess from one file: CommonJS rather than ES modules, data access only through `db/store.js`, the `{ error }` response shape with 400/404 statuses, and the `require.main === module` guard that lets tests import `app` without opening a port. The architecture section only covers how `server.js`, `routes/`, `db/store.js` and `tests/` fit together.

I left out the port override, the single-test name pattern, the lint rule for unused handler arguments, and a note about `.env`. Claude can read the code or config for those, or they are generic advice, and a shorter file is more likely to be followed. I also left out anything sensitive, since the file is committed and shared.

## Permissions

In `.claude/settings.json`:

- **Allow:** `npm test` and `npm run lint`. Both are read-only checks I run constantly, so prompting for them is just noise.
- **Ask:** `git push`. I want to confirm each push before it leaves my machine.
- **Deny:** reading `./.env` and `git push --force`.

Without the `.env` deny rule, Claude could read real secrets (database URLs, API keys) into the conversation, where they might be logged or sent on to other tools. Without the force-push deny rule, a mistaken command could overwrite remote history and destroy teammates' commits, and the `ask` rule alone would still let me approve it by accident.

## Verification

In a fresh session, `/memory` should show `CLAUDE.md` as loaded and `/permissions` should list the allow, ask and deny rules above. I have not run those checks yet.
