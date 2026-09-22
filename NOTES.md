# NOTES.md

## CLAUDE.md choices

I kept it to four short parts: a one-line description, commands (`npm run dev`,
`npm start`, `npm test` including single-test syntax, `npm run lint`),
conventions (one router file per resource mounted in `server.js`, all data
access through `db/store.js`, and the `require.main === module` guard so
tests can import `app` without opening a port), and a short architecture
note pointing at `server.js`, `routes/`, `db/store.js`, and `tests/`.

I left out: a description of what each route does (that's obvious from
reading `routes/users.js` and `routes/health.js`), any mention of the
in-memory store's exact seed data (it's a one-off detail, not a rule to
follow), and anything about `.env` / secrets (nothing sensitive is used by
the starter app, and I didn't want to document env vars that might change).
Shorter felt stronger here — the project is small enough that a longer file
would just restate the code.

## Permission rules

- **allow**: `Bash(npm test:*)` and `Bash(npm run lint:*)` — these are safe,
  read-only-ish commands I run constantly, so approving them every time
  would just be friction.
- **ask**: `Bash(git push:*)` — pushing affects the shared remote, so I want
  a chance to glance at what's being pushed before it happens, without
  banning it outright.
- **deny**: `Read(./.env)` and `Bash(git push --force:*)` — without the
  first, Claude could read real secrets out of `.env` and potentially echo
  them into a response or a commit. Without the second, Claude could
  force-push and silently overwrite commits on the remote (mine or a
  teammate's), which is very hard to undo once others have pulled.

## Verification

Started a fresh Claude Code session and ran `/memory` — `CLAUDE.md` shows as
loaded. Ran `/permissions` — the allow/ask/deny rules from
`.claude/settings.json` all appear. Asked "How do I run the tests here?"
and got the answer straight from `CLAUDE.md` (`npm test`) without further
explanation needed.
