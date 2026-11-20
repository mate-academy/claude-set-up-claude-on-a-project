# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

Express REST API for users and a health check, backed by an in-memory store.

## Commands

- `npm run dev` — start the API on http://localhost:3000 with `node --watch` (set `PORT` to override)
- `npm test` — run all tests with the built-in Node test runner (`node --test`)
- `node --test tests/users.test.js` — run one test file
- `node --test --test-name-pattern="404"` — run tests whose name matches a pattern
- `npm run lint` — ESLint (`eslint:recommended`, v8 `.eslintrc.json` config)

CI (`.github/workflows/ci.yml`, Node 22) runs `npm run lint` then `npm test` on every push and PR.

## Architecture

- `server.js` builds the Express app, mounts each router under its path (`/users`, `/health`), and exports `app`. It only calls `listen()` when run directly (`require.main === module`), so tests import `app` without opening a port.
- `routes/` holds one `express.Router` file per resource. New resources get a new file here, mounted in `server.js`.
- `db/store.js` is the only data-access layer: plain functions over a module-level array. State is not persisted and resets on restart; within a test run it is shared across tests, so writes in one test are visible to later ones.

## Conventions

- Use CommonJS (`require` / `module.exports`), not ES modules — ESLint is configured with `sourceType: "script"`.
- Routes access data only through functions exported from `db/store.js`, never by touching the arrays directly. Add new store functions there when a route needs new data operations.
- Error responses are JSON `{ error: "<message>" }` with the matching status (400 for invalid input, 404 for missing records). Successful creates return 201 with the created object.
- Route params arrive as strings; convert ids with `Number(req.params.id)` before calling the store (ids are numbers).
- Tests use `node:test` + `node:assert` + `supertest` against the exported `app` — not Jest or Mocha. Put them in `tests/*.test.js`.
- Unused route-handler args named `req`, `res`, `next`, or `_` are allowed by the lint config; don't rename them to silence warnings.
