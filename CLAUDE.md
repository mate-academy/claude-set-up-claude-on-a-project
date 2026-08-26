# CLAUDE.md

A small Express API with in-memory storage, used as a course exercise for setting up Claude Code (not for building out app features).

## Commands

- `npm run dev` — start the API on http://localhost:3000 with auto-reload
- `npm test` — run all tests (Node's built-in test runner)
- `npm run lint` — check code style with ESLint

## Conventions

- One route file per resource in `routes/` (e.g. `users.js`, `health.js`), mounted in `server.js`.
- All data access goes through `db/store.js`, not direct manipulation of arrays/objects in routes.
- `no-unused-vars` is a warn-level lint rule; `req`, `res`, `next`, and `_`-prefixed args are exempt.

## Architecture

- `server.js` is the entry point: builds the Express app, mounts route modules, and only calls `app.listen` when run directly (so tests can `require` the app without opening a port).
- `db/store.js` is a tiny in-memory data store standing in for a real database — data resets on every restart.
- there is one route file per resource in the routes/ folder. 
- Tests (`tests/`) use `supertest` against the exported `app` from `server.js`, not a running server.
