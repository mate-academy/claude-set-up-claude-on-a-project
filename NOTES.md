# Notes

## CLAUDE.md
It has four parts: a one-line description, the commands I use (dev server, full test run, single test file/test, lint, plus what CI runs), the conventions you can't easily see from the code, and a short architecture map. The conventions are written as rules Claude can follow without asking: CommonJS only, `node:test` + `supertest` instead of Jest, data access only through `db/store.js`, `{ error }` JSON shape with 400/404, and the route comment style. I also noted that the in-memory store is shared across tests, since that can cause confusing test failures.

I left out things the code already shows (dependency list, file-by-file details, how each route works), one-off tasks, and anything sensitive. It only says that config comes from env vars documented in `.env.example`, and that `.env` must never be read or committed. Shorter means every line gets used.

## Permissions
**Allow:** `npm test`, `node --test`, `npm run lint` and read-only git (`status`, `diff`, `log`). They're safe, I run them all the time, and they don't change anything outside the working tree, so approving each one would just slow things down.

**Ask:** `git push`, because it publishes to the shared remote, and `npm install`, because it changes dependencies and runs third-party install scripts.

**Deny:** reading or editing `.env` / `.env.local` and `cat .env`. Without these rules Claude could read real secrets (API keys, DB credentials) into the conversation, where they could end up in logs, commits, or output. I also deny force-pushes (`--force`, `-f`, `--force-with-lease`). These would otherwise just hit the `git push` ask rule, but one quick approval could overwrite shared history on the remote and throw away other people's commits. So I want them blocked completely, not left to a prompt.

## Verification
In a fresh session, `/memory` shows `./CLAUDE.md` as loaded, and `/permissions` lists the rules above. When I asked "How do I run the tests here?", Claude answered with `npm test`, the single-file and `--test-name-pattern` variants, and the lint-before-push CI note, all from CLAUDE.md, without me explaining anything.
