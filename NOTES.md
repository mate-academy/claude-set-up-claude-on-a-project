# NOTES.md

## CLAUDE.md

I kept it to four parts: a one-line project description, commands (`npm run dev`, `npm test`,
`npm run lint`, plus how to run a single test), two conventions (error-response shape, env var
handling), and an architecture note covering `server.js`, `routes/`, `db/store.js`, and how
`tests/` exercises the app through supertest instead of unit-testing handlers directly.

I left out anything Claude can already discover by reading the code — the full route list,
`package.json` contents, file-by-file structure — since restating that just adds a second place
to keep in sync. I also left out generic advice ("write tests", "handle errors gracefully") and
anything sensitive, like the `.env` example's shape beyond what's needed to explain the
git-ignore setup. The goal was a file where every line saves Claude a question, not a tour of the
repo.

## Permissions (.claude/settings.json)

- **Allow**: `npm test`, `npm run lint`, `npm run dev` — the commands I run constantly while
  iterating, all read-only or local-only in effect (no network calls, no writes outside the
  in-memory store).
- **Ask**: `git push` and `npm install` — not dangerous outright, but worth a pause since one
  publishes work and the other changes the dependency tree/lockfile.
- **Deny**: reading `.env`, `git push --force`, and `rm -rf`.

Without the `.env` deny rule, Claude could read real secrets into its context the moment a `.env`
file exists locally, even though it's git-ignored — the deny rule keeps that from happening
regardless of what ends up in the file. Without the force-push and `rm -rf` deny rules, a bad
suggestion or a misread instruction could overwrite shared branch history or delete files with no
easy way back.

## Verification

- `/memory` shows `CLAUDE.md` loaded from the project root.
- `/permissions` shows the allow/ask/deny rules from `.claude/settings.json`.
- Asking "How do I run the tests here?" in a fresh session answered correctly from `CLAUDE.md`
  without needing extra explanation.
