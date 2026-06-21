# CLAUDE.md

A small Express REST API for managing users, used as the starter project for the Claude Code course.

## Commands

- `npm run dev` — start the API with auto-reload on http://localhost:3000
- `npm test` — run the test suite (Node's built-in runner + supertest)
- `npm run lint` — check code style with ESLint

## Conventions

- Use CommonJS modules (`require` / `module.exports`), not ES `import`/`export`.
- Use double quotes for strings, matching the existing files.
- Access user data only through `db/store.js` — route handlers never touch the data array directly.
- Add one route file per resource in `routes/`, mounted in `server.js`.
- Return errors as JSON with an `error` field and the right status code (e.g. `400` for bad input, `404` for not found).

## Architecture

- `server.js` — entry point. Creates the Express app, mounts routers, and only calls `listen()` when run directly so tests can import `app` without opening a port.
- `routes/` — one router per resource (`users.js`, `health.js`).
- `db/store.js` — a tiny in-memory data store standing in for a real database; data resets on restart.
- `tests/` — request-level tests that import `app` and hit the routes with supertest.
