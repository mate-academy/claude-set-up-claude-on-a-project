# NOTES.md

## CLAUDE.md

I kept it to four lean parts: a one-line description, commands (`npm run dev`, `npm test`, running a single test file, `npm run lint`, plus the CI note), conventions (one route file per resource, all data access through `db/store.js`, and the `require.main === module` export pattern that lets tests import `app` directly), and an architecture overview of how `server.js`, `routes/`, `db/store.js`, and `tests/` fit together.

I left out anything Claude can already discover by reading the code — the exact file list, the shape of each endpoint's response, ESLint's specific rule set — since restating those just goes stale the moment the code changes. I also left out generic advice ("write tests", "handle errors") and anything sensitive; there's nothing secret in this starter project, but if there were (API keys, internal URLs), it wouldn't belong here since `CLAUDE.md` gets committed and read by every session.

## Permissions

Added via `/permissions`, and mirrored into the committed `.claude/settings.json` (the command itself wrote to `.claude/settings.local.json`, which is git-ignored and personal-only, so I copied the same rules into the shared file):

- **allow** `Bash(npm test:*)` — the test command is safe and run constantly; no need to prompt every time.
- **deny** `Read(./.env)` — stops Claude from ever reading real secrets, even if asked to "check the env config" or similar. Without it, a session could read and potentially echo back credentials into chat history or a file.
- **deny** `Bash(git push --force:*)` — force-push rewrites shared history and can silently destroy a teammate's commits on a shared branch. Without this, a routine "clean up my branch" request could force-push over someone else's work.
- **ask** `Bash(git push:*)` — regular pushes are reversible but still visible to others, so I want a confirmation prompt each time rather than blanket allow or deny.
