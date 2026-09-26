# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

A small Express 4 REST API (users + health check) backed by an in-memory store, used as the starter project for a Claude Code course.

## Commands

- `npm run dev` — start the API with `node --watch` on http://localhost:3000 (`PORT` env var overrides)
- `npm test` — run all tests with the built-in Node test runner (`node --test`)
- `node --test --test-name-pattern="404" tests/users.test.js` — run a single test by name
- `npm run lint` — ESLint (`eslint:recommended`, ESLint 8 legacy `.eslintrc.json`)

CI (`.github/workflows/ci.yml`, Node 22) runs `npm run lint` then `npm test` on every push and PR — both must pass.

## Conventions

- CommonJS only (`require` / `module.exports`), not ES modules — ESLint is configured with `sourceType: "script"`.
- Tests use `node:test` + `node:assert` + `supertest`, not Jest/Mocha. Import `app` from `../server` and call `request(app)`; never start a real server in tests.
- Routes never touch data directly — all reads/writes go through functions exported from `db/store.js`.
- Error responses are JSON shaped `{ error: "<message>" }` with the matching status (400 for invalid input, 404 for missing resources).
- Prefix each route handler with a comment naming the method and path, e.g. `// GET /users/:id — ...`.
- Don't read or commit `.env`; config samples go in `.env.example`.

## Architecture

- `server.js` builds the Express app, mounts routers (`/users`, `/health`), and exports `app`. It only calls `listen()` when run directly (`require.main === module`), which is what lets tests import it.
- `routes/` holds one `express.Router()` file per resource; a new resource means a new file here plus an `app.use()` line in `server.js`.
- `db/store.js` is module-level in-memory state that resets on restart. Because Node caches the module, state is shared across all tests in a file — tests that create users affect later assertions, so don't assume fixed counts or IDs.
