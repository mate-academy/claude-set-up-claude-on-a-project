# NOTES.md

## CLAUDE.md

I kept it to four short sections: a one-line project description, the three commands I run most (`npm run dev`, `npm test`, `npm run lint`, plus the single-test-file invocation), four real conventions (CommonJS, one route file per resource, all data access through `db/store.js`, and the `require.main === module` guard in `server.js`), and a short architecture overview of `server.js` / `routes/` / `db/store.js` / `tests/`.

I deliberately left out:
- A full file/folder listing — it's five files, easily discoverable with `ls` or a single read.
- Anything about `.env` contents — the file only has a `PORT` example and a commented-out placeholder; there's nothing real to document, and I don't want Claude treating a placeholder as a convention.
- Generic advice like "write tests" or "handle errors" — not specific to this repo, so it doesn't earn its place.
- Any mention of the course/assignment structure — that's true today but not a lasting fact about the codebase.

## .claude/settings.json

- **Allow**: `Bash(npm test:*)` — the test command is safe, read-only from the repo's perspective, and run constantly; approving it every time would just be friction.
- **Ask**: `Bash(git push:*)` — pushing is reversible but visible to others, so I want a chance to glance at it first rather than auto-approving.
- **Deny**: `Read(./.env)` and `Bash(git push --force:*)` — `.env` is where real secrets would live once this project grows past the starter stage, and Claude has no legitimate reason to read it; without the deny rule, a prompt that asks Claude to "check the environment config" could leak secrets into the conversation. `git push --force` can silently overwrite someone else's commits on a shared branch; without the deny rule a single bad instruction (or a misfired destructive suggestion) could discard work with no easy recovery.

## Verification

- `/memory` shows `CLAUDE.md` loaded from the project root.
- `/permissions` shows the allow/ask/deny rules above.
