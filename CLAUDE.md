# CLAUDE.md

Express API serving user data from an in-memory store.

## Commands

- `npm run dev` — start API, auto-reload (<http://localhost:3000>)
- `npm test` — run all tests (Node's built-in test runner)
- `npm run lint` — check code style with ESLint

## Architecture

- `server.js` — entry point; builds the Express app and mounts routers. Exports `app` without calling `listen()` when required (e.g. from tests) so tests can use supertest against it directly; only calls `listen()` when run directly.
- `routes/` — one router file per resource (`users.js`, `health.js`), mounted in `server.js` under `/users` and `/health`.
- `db/store.js` — in-memory data store standing in for a real database. State resets on every restart; not shared across processes.
- `tests/` — supertest-driven tests against the exported `app`, using Node's built-in `node:test` runner (not Jest/Mocha).

## Conventions

- CommonJS throughout (`require`/`module.exports`), not ESM.
- Route handlers validate input and return JSON error bodies (`{ error: "..." }`) with the appropriate status code (400, 404) rather than throwing.
