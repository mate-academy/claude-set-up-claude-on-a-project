# Notes

## What's in CLAUDE.md, and what I left out

`CLAUDE.md` has a one-line description, the commands I run most (`npm run dev`, `npm test`, `npm run lint`, and running one test file), and conventions written as "use X, not Y": CommonJS rather than ES modules, `node:test` + `supertest` rather than Jest, routes going through `db/store.js`, and JSON error responses. It also has a short architecture section covering `server.js`, one route file per resource, and the in-memory store.

I left out the file listing, the README's course and submission steps, generic advice, and anything from `.env`. The file loads into every session, so I kept only what Claude would otherwise get wrong or have to work out each time.

## Permission rules, and why the deny rules matter

Allowed: `npm test`, `npm run lint`, `node --test`, and read-only git commands, because they're safe and run constantly. Ask: `git push` and `npm install`, because they reach outside the machine. Deny: reading or editing `.env`, `git push --force` / `-f`, and `git reset --hard`.

Without the deny rules, Claude could read `.env` while debugging and pull secrets into the conversation, where they could leak into a commit or a log. It could also force-push over teammates' work, or wipe uncommitted changes with no undo. The `.env` rule only blocks Claude's Read tool, so another shell command like `head .env` could still get through. It reduces the risk rather than removing it.

## Verification

- `/memory`: Confirmed CLAUDE.md is loaded as project memory (./CLAUDE.md)
- `/permissions`: Confirmed the allow / ask / deny rules above are listed.
