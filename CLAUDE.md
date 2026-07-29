# CLAUDE.md

## Project

Starter Express API for the Claude Code course.

## Commands

- npm run dev
- npm test
- npm run lint

## Conventions

- Data access goes through `db/store.js`.
- Route handlers validate input and return JSON errors (`{ error: "..." }`) with status code (400, 404).

## Architecture

- `server.js` — entry point; builds the Express app, mounts routers, starts listening. Only calls `app.listen` when run directly (`require.main === module`), so `tests/` can `require("../server")` and drive `app` with `supertest` without opening a real port.
- `routes/` — one file per resource (`users.js`, `health.js`), each exporting an `express.Router()`, mounted in `server.js`.
- `db/store.js` — in-memory data access for users; no real database. Resets on every restart.
- `tests/` — one test file per resource, mirroring `routes/`.
