# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

A small Express REST API (users + health check) used as the starter project for the Claude Code course.

## Commands

- `npm run dev` — start the API with `node --watch` on http://localhost:3000 (`PORT` overrides)
- `npm test` — run all tests (Node's built-in `node --test`, no Jest/Mocha)
- `node --test tests/users.test.js` — run one test file
- `node --test --test-name-pattern="404"` — run tests whose name matches a pattern
- `npm run lint` — ESLint (`eslint:recommended`); CI runs lint then test on Node 22, both must pass

## Conventions

- CommonJS only: `require` / `module.exports`, not `import` / `export` (ESLint `sourceType` is `script`).
- Routes never touch data directly — all reads and writes go through functions exported from `db/store.js`. Add a new store function rather than mutating `users` from a route.
- Errors are returned as JSON `{ error: "<message>" }` with the matching status (400 for missing fields, 404 for not found); successful creates return 201.
- Each route handler gets a one-line comment in the form `// METHOD /path — what it does`.
- Tests use `node:test` + `node:assert` and call the app through `supertest(app)`; never start a real server in tests.

## Architecture

- `server.js` builds the Express app, mounts one router per resource (`/users` → `routes/users.js`, `/health` → `routes/health.js`) and exports `app`. It only calls `listen` when run directly (`require.main === module`), which is what lets tests import it.
- `routes/` holds one `express.Router()` file per resource. A new resource means a new file here plus an `app.use(...)` line in `server.js`.
- `db/store.js` is an in-memory stand-in for a database: module-level state, seeded with two users, reset on every restart. Because the state is shared across a test run, tests that create users affect later tests — assert on shape/status, not exact counts or IDs.
- Config comes from environment variables (`.env.example` is the template; only `PORT` is used today).
