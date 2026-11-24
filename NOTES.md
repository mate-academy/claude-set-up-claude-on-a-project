# Notes

## CLAUDE.md — what's in, what's out

**In:** a one-line description, the commands I actually run (dev, test, lint, plus how to run a single test file or a single test by name), four conventions Claude can follow without asking (CommonJS only, `node:test` + supertest against the exported `app`, data access only through `db/store.js`, `{ error }` JSON responses with proper status codes), and a short architecture note (`server.js` entry point that only listens when run directly, one router per resource in `routes/`, in-memory store shared across tests).

**Out:** the file-by-file listing (Claude can see it with `ls`), generic advice ("write tests", "handle errors"), the course instructions from the README (one-off task, not project knowledge), and anything from `.env`. Every line should change how Claude acts; if it doesn't, it's noise that costs context every session.

## Permission rules

- **allow:** `npm test`, `npm run lint`, `node --test`, `git status`, `git diff` — safe, read-only or local checks I run constantly; no reason to approve them every time.
- **ask:** `git push` (leaves my machine, visible to others) and `npm install` (changes dependencies and `package-lock.json`).
- **deny:** reading `.env` (`Read` and `cat`), `git push --force` / `-f`, and `rm -rf`.

Without the deny rules, Claude could read `.env` while "exploring" and pull real secrets into the conversation (and from there into logs or a commit), or force-push and overwrite remote history on a shared branch. Deny wins over allow/ask, so these stay blocked even if a broader rule is added later.

## Verification

- `/memory` shows `CLAUDE.md` loaded in a fresh session.
- `/permissions` lists the allow / ask / deny rules above.
- Asking "How do I run the tests here?" is answered from `CLAUDE.md`.
