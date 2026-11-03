# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

A small Express REST API (users + health check) used as the starter project for the Claude Code course.

## Commands

- `npm run dev` — start the API on http://localhost:3000 with `node --watch` (auto-restart)
- `npm test` — run all tests with the built-in `node:test` runner
- `node --test tests/users.test.js` — run one test file; add `--test-name-pattern="404"` to run a single test
- `npm run lint` — ESLint; CI (`.github/workflows/ci.yml`, Node 22) runs lint then tests on every push and PR

## Conventions

- CommonJS only: use `require` / `module.exports`, not `import` / `export` (ESLint is set to `sourceType: script`).
- Tests use `node:test` + `node:assert` + `supertest`, not Jest or Mocha. Import `app` from `../server` and call it with `request(app)`; never start a real server in tests.
- Route handlers never touch the `users` array directly; all data access goes through functions exported from `db/store.js`.
- Errors are returned as JSON `{ error: "<message>" }` with the matching status code (400 for bad input, 404 for not found); successful creates return 201.
- Convert `req.params.id` with `Number(...)` before looking up a record — store IDs are numbers.

## Architecture

- `server.js` builds the Express app, mounts one router per resource, and exports `app`. It only calls `listen()` when run directly (`require.main === module`), which is what lets tests import it.
- `routes/` holds one `express.Router()` file per resource (`users.js` → `/users`, `health.js` → `/health`). A new resource means a new file here plus an `app.use(...)` line in `server.js`.
- `db/store.js` is an in-memory stand-in for a database: data resets on every restart and is shared across all tests in a run, so tests must not assume a fixed number of users.
- Config comes from environment variables (`PORT`, see `.env.example`). Real values live in `.env`, which is git-ignored.
