# CLAUDE.md

Small Express REST API (users + health check) with an in-memory store, used as the base project for the Claude Code course.

## Commands

- `npm run dev` — start the API with auto-reload on http://localhost:3000
- `npm test` — run tests (Node's built-in `node:test` runner)
- `npm run lint` — ESLint; CI runs lint then tests, both must pass

## Conventions

- Use CommonJS (`require` / `module.exports`), not ES modules (`import` / `export`) — ESLint is set to `sourceType: "script"`.
- Routes never touch data directly: add a function to `db/store.js` and call it from the route.
- Return errors as JSON `{ "error": "<message>" }` with the matching status code (400 invalid input, 404 not found); return 201 on create.
- Tests use `node:test` + `node:assert` + `supertest`, importing `app` from `server.js` — do not start a real server or add Jest/Mocha.
- Do not add dependencies without asking.

## Architecture

- `server.js` — entry point: builds the Express app, mounts routers, exports `app`; only calls `listen()` when run directly.
- `routes/` — one file per resource (`users.js`, `health.js`), each exports an `express.Router()`; a new resource gets its own file, mounted in `server.js`.
- `db/store.js` — the only data-access layer; in-memory, resets on restart.
- `tests/` — `*.test.js` files picked up automatically by `node --test`.
