# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

An Express REST API that serves a `/users` resource (list, fetch by id, create) and a `/health` liveness check, backed by an in-memory store. It is the practice codebase for the Claude Code course.

## Commands

- `npm run dev` — start the API on http://localhost:3000 with auto-reload (`node --watch`)
- `npm test` — run all tests (`node --test`, no test framework)
- `node --test tests/users.test.js` — run a single test file
- `npm run lint` — ESLint (`eslint:recommended`)

## Conventions

- Use CommonJS (`require` / `module.exports`), not ESM `import`. ESLint parses files as `script`.
- Add a route resource as its own file in `routes/`, then mount it in `server.js` with `app.use("/name", ...)`. One file per resource.
- Do all data reads and writes through `db/store.js`; route handlers never touch the `users` array directly.
- Keep the `require.main === module` guard in `server.js` — tests import `app` and would otherwise open a real port.
- Tests use `node:test` + `node:assert` with `supertest` against the imported `app`; don't add Jest/Mocha.

## Architecture

- `server.js` is the entry point: it creates the Express app, enables JSON body parsing, mounts each router, and (only when run directly) listens on `PORT` from the environment.
- `routes/` holds one router file per resource — `users.js` and `health.js` — each an `express.Router()` mounted in `server.js` under its own path prefix.
- `db/store.js` handles all data access: an in-memory `users` array with `getAllUsers` / `getUserById` / `createUser` and an auto-incrementing `nextId`. It stands in for a real database and resets on every restart — nothing is persisted.

Request flow: `server.js` → per-resource router in `routes/` → `db/store.js`.

CI (`.github/workflows/`) runs `npm run lint` then `npm test` on every push and pull request against Node 22.
