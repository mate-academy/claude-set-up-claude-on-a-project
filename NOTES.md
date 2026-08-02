# NOTES.md

## CLAUDE.md

What I put in: a one-line project description, three commands (dev/test/lint), two conventions taken from the real code (CommonJS because of `.eslintrc.json`, tests through `app` + `supertest`), and three lines of architecture.

What I deliberately left out: the list of endpoints, how `store.js` is built, the steps from the README, and any mention of CI — all of that is either obvious from the code or one-off. A shorter file is more reliable.

## Permissions

What I added: allow `npm test` (a safe, frequently used command), deny `Read(.env)` and deny `git push --force`, ask for `git push`.

Without the deny on `Read(.env)`, Claude could read real secrets from `.env` into the session context — that's a leak. Without the deny on `git push --force`, someone else's history in the repository could be overwritten by accident.
