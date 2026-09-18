# CLAUDE.md

## Project

A minimal Express API (starter for the Claude Code course).

## Commands

- `npm install` — install dependencies
- `npm run dev` — start the API with auto-reload (`http://localhost:3000`)
- `npm start` — start the API without auto-reload
- `npm test` — run all tests (`node --test`, via `tests/*.test.js`)
- `npm run lint` — run ESLint over the project

## Architecture

- `server.js` — entry point; builds the Express `app`, mounts routers, and only calls `app.listen` when run directly (`require.main === module`), so `tests/` can `require("../server")` and drive it with `supertest` without opening a real port.
- `routes/` — one router file per resource (`users.js`, `health.js`), mounted in `server.js` under its own path prefix.
- `db/store.js` — in-memory data access for users. All data resets on restart; there is no real database.
- `tests/` — `node:test` + `supertest`, one file per resource, mirroring `routes/`.

## Conventions

- Data access for a resource goes through its `db/store.js` module, not inline in the route handler.
- Route handlers validate input and return JSON error bodies (e.g. `{ error: "..." }`) with the appropriate status code (400, 404) rather than throwing.
