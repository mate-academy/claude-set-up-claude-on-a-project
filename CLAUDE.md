# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

A small Express REST API (users + health check) backed by an in-memory store, used as the starter project for the Claude Code course.

## Commands

- `npm run dev` — start the API with auto-reload on http://localhost:3000 (`PORT` overrides)
- `npm test` — run all tests (Node's built-in runner, `node --test`)
- `node --test --test-name-pattern="404" tests/users.test.js` — run a single test by name
- `npm run lint` — ESLint (`eslint:recommended`); CI runs lint then tests on Node 22

## Conventions

- Use CommonJS (`require` / `module.exports`), not ES modules — ESLint is configured with `sourceType: "script"`.
- Routes never touch data directly; they go through the functions exported by `db/store.js`. Add new data operations there.
- Error responses are JSON of the form `{ error: "<message>" }` with the matching status (400 validation, 404 not found); successful creates return 201.
- Tests use `node:test` + `node:assert` + `supertest` against the exported `app` — never start a real server in tests.
- Unused `req`, `res`, `next`, or `_` parameters are allowed by the lint config; keep Express handler signatures as `(req, res)`.

## Architecture

- `server.js` builds the Express app, mounts each router under its path (`/users`, `/health`), and exports `app`. It only calls `listen()` when run directly (`require.main === module`), which is what lets tests import it.
- `routes/` holds one `express.Router()` file per resource; a new resource means a new file here plus an `app.use()` line in `server.js`.
- `db/store.js` is module-level in-memory state (seeded with users 1 and 2). It resets on restart, and state is shared across tests in the same process — tests should not assume a fixed user count.
