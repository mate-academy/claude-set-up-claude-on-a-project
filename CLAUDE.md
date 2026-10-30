# CLAUDE.md

Small Express REST API (users + health check) used as the starter project for the Claude Code course.

## Commands

- `npm install` — install dependencies (run once after cloning)
- `npm run dev` — start the API with auto-reload on http://localhost:3000
- `npm test` — run all tests (`node --test`, picks up `tests/*.test.js`)
- `npm run lint` — ESLint; must pass before committing (CI runs lint, then tests)

## Conventions

- Use CommonJS (`require` / `module.exports`), not ES modules (`import` / `export`).
- Write tests with `node:test` + `node:assert` + `supertest`, not Jest or Mocha. Import `app` from `../server` — never call `app.listen()` in tests.
- Route handlers read and write data only through functions in `db/store.js`; never touch the `users` array directly from a route.
- Error responses are JSON `{ "error": "<message>" }` with the matching status code (400 invalid input, 404 not found).
- Add a new resource as its own file in `routes/` and mount it in `server.js` with `app.use("/<resource>", ...)`.
- Never read, print or commit `.env`; document new config keys in `.env.example` instead.

## Architecture

- `server.js` — entry point: creates the Express app, adds `express.json()`, mounts routers, exports `app`; only listens when run directly.
- `routes/` — one router file per resource (`users.js`, `health.js`).
- `db/store.js` — in-memory data helper standing in for a database; data resets on every restart.
- `tests/` — HTTP-level tests against the exported `app`.
