# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

Small Express REST API (users + health check) with an in-memory data store, used as the starter project for the Claude Code course.

## Commands

- `npm run dev` — start the API with auto-reload on http://localhost:3000 (`PORT` overrides)
- `npm test` — run all tests (Node's built-in runner, `node --test`)
- `node --test tests/users.test.js` — run one test file
- `node --test --test-name-pattern="404"` — run tests whose name matches
- `npm run lint` — ESLint; CI runs lint then tests on Node 22, so both must pass

## Conventions

- Use CommonJS (`require` / `module.exports`), not ES modules — ESLint is configured with `sourceType: "script"`.
- Use Node's built-in `node:test` and `node:assert` with `supertest` for tests, not Jest or Mocha.
- Route handlers access data only through functions exported by `db/store.js`; never touch the `users` array directly.
- Return errors as JSON `{ error: "<message>" }` with the matching status code (400 for invalid input, 404 for missing resources).

## Architecture

- `server.js` builds the Express app, mounts each router under its path (`/users`, `/health`), and exports `app`. It only calls `listen()` when run directly, so tests import `app` and drive it with supertest without opening a port.
- `routes/` holds one `express.Router` per resource; a new resource needs a new route file plus a mount line in `server.js`.
- `db/store.js` is a module-level in-memory store standing in for a database. State resets on restart but is shared across all tests in the same process, so tests that create data must not assume a fresh store.
