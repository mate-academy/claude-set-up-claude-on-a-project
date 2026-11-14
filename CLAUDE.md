# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

A small Express REST API (users + health check) with an in-memory data store, used as the starter project for the Claude Code course.

## Commands

- `npm run dev` — start the API with auto-reload on http://localhost:3000 (`PORT` overrides)
- `npm test` — run all tests (`node --test`, picks up `tests/*.test.js`)
- `node --test tests/users.test.js` — run one test file
- `node --test --test-name-pattern="404"` — run tests whose name matches a pattern
- `npm run lint` — ESLint (`eslint:recommended`)

CI (`.github/workflows/ci.yml`, Node 22) runs `npm run lint` then `npm test` on every push and PR — both must pass.

## Conventions

- CommonJS only: use `require` / `module.exports`, not `import` / `export` (ESLint is configured with `sourceType: "script"`).
- Tests use the built-in `node:test` + `node:assert` with `supertest`; do not add Jest, Mocha, or other test runners.
- Error responses are JSON shaped `{ error: "<message>" }` with the matching status code (400 for invalid input, 404 for missing resources).
- Route handlers never touch data directly — all reads/writes go through functions exported from `db/store.js`.
- Route `:id` params are strings; convert with `Number(...)` before looking them up in the store.

## Architecture

- `server.js` builds the Express `app`, mounts one router per resource (`app.use("/users", ...)`), and only calls `listen()` when run directly (`require.main === module`). It exports `app` so tests can drive it via `supertest` without opening a port.
- `routes/` — one file per resource, each exporting an `express.Router()`. A new resource = a new file here + one `app.use` line in `server.js`.
- `db/store.js` — module-level in-memory arrays standing in for a database. Data resets on restart, and because the module is a singleton, state created in one test (e.g. a `POST /users`) is visible to later tests in the same file.
