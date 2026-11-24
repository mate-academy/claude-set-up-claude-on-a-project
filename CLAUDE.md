# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

Small Express REST API (users + health check) with an in-memory store, used as the base project for the Claude Code course.

## Commands

- `npm run dev` — start the API with auto-reload on http://localhost:3000 (`PORT` env overrides)
- `npm test` — run all tests (Node's built-in `node:test` runner + supertest)
- `node --test tests/users.test.js` — run a single test file
- `node --test --test-name-pattern="404" tests/users.test.js` — run tests whose name matches
- `npm run lint` — ESLint (`eslint:recommended`)

CI (`.github/workflows/ci.yml`, Node 22) runs `npm run lint` then `npm test` on every push/PR — both must pass.

## Conventions

- CommonJS only (`require` / `module.exports`), not ES modules — ESLint is configured with `sourceType: "script"`.
- Tests use `node:test` and `node:assert`, not Jest/Mocha. Test the app via `supertest` against the exported `app`, never by opening a real port.
- Route handlers access data only through functions in `db/store.js`; never touch the `users` array directly from a route.
- Error responses are JSON shaped `{ "error": "<message>" }` with the proper status (400 validation, 404 not found); creation returns 201.

## Architecture

- `server.js` builds the Express app, mounts each router under its resource path (`/users`, `/health`), and exports `app`. It only calls `listen()` when run directly (`require.main === module`), so tests can import it.
- `routes/` — one file per resource, each exporting an `express.Router()`. New resources get a new file here plus a mount line in `server.js`.
- `db/store.js` — in-memory data layer (stand-in for a real DB). State lives at module level, resets on restart, and is shared across all tests in the same process, so tests must not assume a fixed user count.
- Config comes from `.env` (see `.env.example`); `.env` is git-ignored and must not be read or committed.
