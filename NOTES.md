# NOTES

## CLAUDE.md

**What I put in.** A one-line description; the commands that aren't guessable from `package.json` alone (single-file test run, the Node 22 / built-in-runner requirement, what `dev` actually does); conventions written as "use X, not Y" so Claude follows them without asking (CommonJS not ESM, `node:test`/`supertest` not Jest, all data access through `db/store.js`, new resources as `routes/<name>.js` mounted in `server.js`); and an architecture section covering the one thing you only learn by reading several files together — that `server.js` exports `app` and only calls `listen()` when run directly, which is why tests can import it without a port.

**What I left out and why.** File trees and the dependency list (discoverable in seconds). Generic Node/Express/git advice (not project-specific). The course submission steps from the README (a one-off task, not standing guidance). Anything about `.env` contents (sensitive, and the example file already documents the shape). The aim was that every line saves a real question on this repo.

## .claude/settings.json

**allow** — `npm install`, `npm test:*`, `npm run lint:*`, `node --test:*`. These are read-only-ish, run every session, and match what CI runs, so prompting on them is pure friction.

**ask** — `git push:*`. Pushing is outward-facing; I want to see the branch and message each time rather than pre-authorize it.

**deny** — `Read(./.env)`, `git push --force:*` / `-f:*`, `rm -rf:*`. `.env` is git-ignored and would hold real secrets; without the deny rule Claude could read it into the transcript while "just checking config," leaking credentials into context and any logs. The force-push and `rm -rf` rules block the two easiest ways to destroy work irreversibly — a force-push can overwrite `main`'s history, and `rm -rf` can wipe the tree with no undo.

## Verification

- `/memory` — CLAUDE.md shows as loaded from the project root.
- `/permissions` — the allow / ask / deny rules above appear.
- Asked "How do I run the tests here?" in a fresh session — answered `npm test` (and the single-file form) straight from CLAUDE.md with no explanation from me.
