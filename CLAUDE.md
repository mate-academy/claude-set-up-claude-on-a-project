# CLAUDE.md

Small Express REST API (users + health check) with an in-memory store, used as the base project for the Claude Code course.

## Commands

- `npm run dev` — start the API on http://localhost:3000 with auto-reload
- `npm test` — run all tests (Node's built-in runner, `node --test`)
- `npm run lint` — ESLint over the whole repo; CI runs lint, then tests, on Node 22

## Conventions

- Use CommonJS (`require` / `module.exports`), not ES modules (`import` / `export`).
- Use double quotes and semicolons, matching the existing files.
- Write tests with `node:test` + `node:assert` + `supertest`, not Jest or Mocha. Put them in `tests/<resource>.test.js` and import `app` from `../server`.
- Route handlers never touch data directly — call a function exported from `db/store.js`; add one there if it's missing.
- Errors are JSON `{ "error": "<message>" }` with the right status code (400 for bad input, 404 for not found); successful creates return 201.
- After any code change, run `npm run lint` and `npm test` before calling the work done.

## Architecture

- `server.js` — builds the Express app, mounts routers, exports `app`. It only calls `listen()` when run directly, so tests import `app` without opening a port.
- `routes/` — one file per resource (`users.js`, `health.js`), each exporting an `express.Router()`. A new resource = a new file here plus an `app.use("/<resource>", ...)` line in `server.js`.
- `db/store.js` — the only data-access layer. In-memory arrays; data resets on every restart, so don't rely on persistence.
- Config comes from environment variables (see `.env.example`); never read or commit `.env`.
