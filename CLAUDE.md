# CLAUDE.md

Small Express REST API (users + health check) used as the starter project for the Claude Code course.

## Commands
- `npm install` — install dependencies (first run only)
- `npm run dev` — start the API with auto-reload on http://localhost:3000
- `npm test` — run the tests (Node's built-in test runner)
- `npm run lint` — run ESLint; CI runs lint and tests on Node 22, so both must pass before a push

## Conventions
- Use CommonJS (`require` / `module.exports`), not ES modules (`import` / `export`).
- Write tests with `node:test` + `node:assert` + `supertest` in `tests/`, not Jest or Mocha.
- Routes never touch data directly — add or change data functions in `db/store.js` and call them from the route.
- Return errors as JSON `{ "error": "<message>" }` with the matching status code (400 for bad input, 404 for missing).
- Do not read, print, or commit `.env`; put new config keys in `.env.example` with placeholder values.

## Architecture
- `server.js` — entry point: builds the Express app, mounts routers, exports `app`. It only calls `listen()` when run directly, so tests import `app` without opening a port.
- `routes/` — one router file per resource (`users.js`, `health.js`), mounted in `server.js` (`/users`, `/health`).
- `db/store.js` — in-memory data store standing in for a database; data resets on every restart.
