# NOTES.md

## CLAUDE.md choices

I kept it to the four required parts: a one-line description, the commands I actually run (`dev`, `test`, `lint`, plus running a single test file), the two data-access/validation conventions that are already followed in `routes/users.js` and `db/store.js`, and a short architecture note on how `server.js`, `routes/`, and `db/store.js` fit together.

I left out a file-by-file listing of the repo (Claude can read the directory itself), generic engineering advice (writing tests, avoiding secrets), and anything that would only matter for a single one-off task. Everything in the file is something Claude would otherwise have to re-derive by reading multiple files, or would get wrong by guessing (e.g. that data access goes through `db/store.js` rather than routes touching data directly).

## Permission rules

- **Allow**: `Bash(npm test:*)` and `Bash(npm run lint:*)` — both are safe, read-only-in-effect commands I run constantly, so I don't want to be prompted every time.
- **Deny**: `Read(./.env)` and `Bash(git push --force:*)` — without the first, Claude could read real secrets out of a local `.env` file if one ever exists and paste them into context or output. Without the second, a routine push could silently rewrite shared history and drop someone else's commits.
- **Ask**: `Bash(git push:*)` — pushing is visible to others, so I want a chance to review what's being pushed each time rather than allowing it outright.

## Verification

Confirmed `/memory` shows `CLAUDE.md` loaded and `/permissions` lists the allow/ask/deny rules above.
