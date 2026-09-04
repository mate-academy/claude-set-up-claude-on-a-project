# NOTES.md

## CLAUDE.md choices

I kept `CLAUDE.md` to four lean parts: a one-line description of the Express API, the commands I actually run (`npm run dev`, `npm test`, `npm run lint`, plus how to run a single test file), the architecture (entry point, one router per resource, all data access through `db/store.js`), and two real conventions (routes go through `db/store.js` instead of touching in-memory arrays directly, and handlers return `{ error: "..." }` JSON with 400/404 instead of throwing).

I deliberately left out anything Claude can already derive by reading the code — full route lists, the shape of the in-memory store, dependency versions — since that goes stale and just adds noise. I also left out secrets, `.env` contents, and one-off task notes (e.g. "fix bug X"); those belong in a PR description or issue, not a file that's loaded into every session.

## Permission rules

- **allow**: `Bash(npm test:*)` — the test command is safe, run constantly, and shouldn't need a prompt every time.
- **ask**: `Bash(git push:*)` — pushing is fine to do often but I want a chance to glance at what's being pushed first.
- **deny**: `Read(./.env)` and `Bash(git push --force:*)` — blocks Claude from ever reading real secrets out of `.env`, and blocks force-pushes, which can silently overwrite remote history/other people's commits. Without the deny rule, a prompt like "clean up my env file" or "fix the diverged branch" could lead Claude to read secrets into context or force-push over someone else's work — both hard to notice until after the damage is done.

## Verification

- `/memory` shows `CLAUDE.md` loaded from the project root.
- `/permissions` shows the allow/ask/deny rules above.
- Asking "How do I run the tests here?" gets answered directly from `CLAUDE.md` (`npm test`, or `node --test tests/users.test.js` for a single file) without further explanation.
