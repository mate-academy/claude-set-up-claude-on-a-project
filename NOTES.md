# NOTES.md

## CLAUDE.md

What's in it: a one-line project description, the three commands I actually run day to day (`npm run
dev`, `npm test`, `npm run lint`, plus how to run a single test file), two real conventions (the
inline validation pattern in `routes/users.js` since there's no shared error middleware, and
CommonJS/double-quote style), and a short architecture note on the `server.js` conditional-listen
trick, the routes → `db/store.js` layering, and the fact that the store is in-memory with no
persistence.

Left out on purpose:
- `npm install` and `npm start` — one-off/obvious, not something worth a line.
- The `.env.example` convention bullet — it just repeated the comments already in that file.
- File-by-file structure — visible from `ls`, doesn't need restating.
- Anything about the course assignment itself — that's the README's job, not something a future
  Claude session needs to know to work on the app code.

The goal was that every line in the file tells Claude something it couldn't get in ten seconds from
reading the code, keeping it short enough to actually get read.

## Permissions (`.claude/settings.json`)

- **allow**: `npm test` and `npm run lint` (both Bash and PowerShell forms, since my sessions run
  PowerShell but the README's example uses Bash syntax) — safe, read-only-ish commands I run
  constantly, no reason to be prompted every time.
- **ask**: `git push` — pushing affects a shared remote, so I want a chance to glance at what's going
  out before it does.
- **deny**: reading `.env`, and `git push --force`.

Without the `Read(./.env)` deny rule, Claude could open `.env` while poking around the repo and end
up with real secrets (e.g. a `DATABASE_URL` with credentials) in its context — and from there,
potentially echo them back in output, put them in a commit, or paste them into a PR description.
Without the `git push --force` deny rule, a bad rebase/reset combined with a force-push could
silently overwrite someone else's commits on the shared remote with no easy way back.

## Verification

- `/memory` shows `CLAUDE.md` loaded (confirmed — asking "how do I run tests here" was answered
  correctly from the file's Commands section without extra explanation).
- `/permissions` shows the allow/ask/deny rules from `.claude/settings.json`.
