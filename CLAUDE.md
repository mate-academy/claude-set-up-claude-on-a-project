# CLAUDE.md

This is a small starter Express API for the Claude Code course (a tiny in-memory /users + /health service).

## Commands

- `npm install` — install dependencies
- `npm run dev` — start the API on http://localhost:3000 with auto-reload (`node --watch`)
- `npm start` — start the API without auto-reload
- `npm test` — run all tests (Node's built-in test runner)


## Architecture

- `server.js` — entry point; builds the Express app and mounts routes. Exports `app` without calling `listen()` when required (e.g. from tests), only starts the server when run directly.
- `routes/` — one file per resource (`users.js`, `health.js`), each exporting an `express.Router()`.
- `db/store.js` — in-memory data store standing in for a real database; state resets on every restart.
- `tests/` — one test file per resource, using Node's `node:test` + `assert` and `supertest` against the exported `app`.

## Conventions

- Route handlers stay thin: validate input, call into `db/store.js`, return JSON — no business logic inline in `routes/`.
- Missing/invalid input returns `400`; a missing resource returns `404` (see `routes/users.js` for the pattern).
