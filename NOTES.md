# NOTES

## CLAUDE.md

I kept it to four short parts: a one-line description, the commands I actually run (`dev`, `test`,
including a single-test pattern, and `lint`), two real conventions (CommonJS style, and routes
delegating to `db/store.js` instead of touching data directly), and a short architecture note on
`server.js` and `db/store.js`.

I deliberately left out:
- The full file/folder listing — Claude can see the repo itself, no need to duplicate it.
- The course-assignment instructions from the README (branch naming, PR submission, definition of
  done) — those are about *doing this exercise*, not about the codebase, so they'd go stale and add
  noise to every future session.
- Anything about `.env` secrets beyond "they exist and are git-ignored" — there's nothing real to
  document yet, and I don't want Claude treating a placeholder as a real config contract.

## Permissions (`.claude/settings.json`)

- **Allow**: `npm test`, `npm run lint`, `npm run dev` — these are safe, read-only-ish commands I run
  constantly, and confirming them every time would just be friction.
- **Ask**: `git push` — pushing affects the shared remote, so I want a chance to glance at what's
  going out before it does.
- **Deny**: reading `./.env` and `git push --force`. Without the `.env` deny rule, Claude could read
  and potentially echo real secrets back into a response or a commit message once the file has real
  values in it. Without the force-push deny rule, an agent (or me, half paying attention) could
  silently overwrite remote history on a shared branch.

## Verification

- Start a fresh session and run `/memory` — confirm `CLAUDE.md` shows as loaded from the project
  root.
- Run `/permissions` — confirm the allow/ask/deny rules from `.claude/settings.json` show up there.
- Ask "How do I run the tests here?" — it should answer `npm test` from `CLAUDE.md` without needing
  it explained.
