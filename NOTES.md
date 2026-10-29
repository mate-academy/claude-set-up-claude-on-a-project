# Notes: setting up Claude Code on this project

## What I put in CLAUDE.md, and what I left out

**Kept:** a one-line description, the three commands I actually run (`dev`, `test`, `lint`), conventions taken from the existing code (CommonJS not ESM, `node:test` + `supertest` not Jest, data access only through `db/store.js`, the `{ error }` JSON shape for 400/404), my personal coding rules, and a short architecture map (`server.js` → `routes/<resource>.js` → `db/store.js`). These are the things Claude would otherwise guess wrong or have to rediscover every session.

**Left out:** a file-by-file listing, individual route details, seed data and ESLint rule specifics — Claude can read those from the code in seconds, and they would go stale. I also left out the course task text, one-off notes, and anything from `.env`: secrets must never sit in a committed file that is loaded into every session.

## Permission rules

- **allow** `npm test` and `npm run lint` — safe, read-only checks I run constantly, so no prompt needed.
- **ask** `git push` — it is outward-facing, so I want to confirm each time.
- **deny** `Read(./.env)` and `git push --force`.

Without the deny rules, Claude could read `.env` and pull real secrets (e.g. a `DATABASE_URL` password) into its context, where they could end up in output, logs or a commit. A force-push could overwrite shared history on the remote, which is hard to undo.

While checking the repo I also found that `.gitignore` had leading spaces on most lines, so `.env` and `.claude/settings.local.json` were **not** actually ignored. I removed the whitespace; `git check-ignore` now confirms both are ignored.

## Verification

In a fresh session, `/memory` showed `CLAUDE.md` as loaded and `/permissions` listed the allow / ask / deny rules above. Asking "How do I run the tests here?" got `npm test` (node:test + supertest) straight from `CLAUDE.md`.
