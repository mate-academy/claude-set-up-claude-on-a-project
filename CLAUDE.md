# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

Express API exposing `/users` and `/health` endpoints, backed by an in-memory data store.

## Commands

- `npm run dev` — start the API with auto-reload on http://localhost:3000
- `npm test` — run all tests
- `node --test tests/users.test.js` — run a single test file
- `npm run lint` — check code style

## Conventions

- CommonJS throughout (`require`/`module.exports`), not ESM import/export.
- Double quotes and semicolons, matching the existing files — `eslint:recommended` enforces the rest.
- Route handlers stay thin: validation and status codes in the route file, data access only through `db/store.js`.

## Architecture

- `server.js` is the entry point: builds the Express `app`, mounts route modules, and only calls `app.listen` when run directly (so `tests/` can `require("../server")` without opening a port).
- One route file per resource under `routes/` (`users.js`, `health.js`), each exporting an `express.Router()`.
- `db/store.js` is the sole data-access layer — an in-memory array with no persistence; state resets on every restart. Add new data operations here rather than manipulating arrays in route files.
