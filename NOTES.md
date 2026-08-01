# NOTES.md

## CLAUDE.md

I kept it to four sections: a one-line project description, Commands, Conventions, and Architecture.

I included the commands I actually run (`npm run dev`, `npm test`, running a single test file, `npm run lint`) plus a note that CI runs lint and test on every push — useful context, not obvious just from reading the code. Conventions cover things Claude could otherwise guess wrong: CommonJS over ES modules, double quotes, one route file per resource, and the `{ error: "..." }` JSON error pattern. Architecture explains the non-obvious parts: why `server.js` guards `app.listen` behind `require.main === module` (so Supertest can import `app` without opening a real port), and that `db/store.js` is the single data-access layer.

I left out: anything derivable from just reading the files (e.g. listing every route or every field in the store), any one-off notes about things I fixed during setup, and anything from `.env`/`.env.example` — no secrets or config values belong in a file that gets committed and read by an LLM on every session.

## Permissions

In `.claude/settings.json`:
- **allow**: `Bash(npm test:*)`, `Bash(npm run lint:*)` — read-only checks I run constantly, no reason to confirm every time.
- **ask**: `Bash(git push:*)` — changes shared/remote state, want a chance to review before it happens.
- **deny**: `Read(./.env)`, `Bash(git push --force:*)`.

Without the `Read(./.env)` deny rule, Claude could read real secrets (API keys, DB credentials) straight into the conversation context the moment it opened the file — even just to "check config" — which risks leaking them into logs, shared sessions, or a pasted transcript. Without the `git push --force` deny rule, Claude could overwrite remote history/branches irreversibly, including other people's commits, with no confirmation step in between.

## Verification

Ran `/memory` in a fresh session — `CLAUDE.md` shows as loaded. Ran `/permissions` — the allow/ask/deny rules above all appear. Asked "How do I run the tests here?" and got the answer straight from CLAUDE.md's Commands section without further explanation needed.
