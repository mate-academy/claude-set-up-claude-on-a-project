# NOTES.md

## CLAUDE.md

I kept it to four things: a one-line description, the three npm commands (`dev`, `test`, `lint`), a handful of conventions (CommonJS not ESM, the quote/semicolon style from `.eslintrc.json`, thin route handlers, and the supertest-against-exported-app testing pattern), and a short architecture note on how `server.js`, `routes/`, and `db/store.js` fit together — including the `require.main === module` trick that lets tests import `app` without opening a port.

I left out anything Claude can already see by reading the code — the file listing, the exact route paths, the shape of the in-memory user data — since restating that just adds noise without saving a question. I also left out one-off notes (this task, the course structure) and anything from `.env.example`, even though it's just a placeholder, since a `CLAUDE.md` shouldn't be the place secrets-shaped values live.

## Permissions

I added: `allow` on `Bash(npm test:*)` since it's a safe, frequent, read-only command; `ask` on `Bash(git push:*)` so a push always gets a confirmation; and `deny` on `Bash(git push --force:*)`.

Without the deny rule, an agent that misjudges a rebase/history-rewrite situation could force-push over a branch, silently discarding teammates' commits with no easy recovery. `ask` alone isn't enough for that one — a force-push is destructive and hard to reverse, so it should be a hard no rather than something a distracted approval click lets through.

## Verification

`/memory` opens `./CLAUDE.md`, confirming it's loaded for the session. `/permissions` lists the three rules above (`Bash(npm test:*)` allow, `Bash(git push:*)` ask, `Bash(git push --force:*)` deny), confirming they're picked up from `.claude/settings.json`.
