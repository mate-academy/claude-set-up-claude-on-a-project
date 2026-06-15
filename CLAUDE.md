# CLAUDE.md

A small Express API serving `/users` and `/health` endpoints, backed by an in-memory store.

## Commands

- `npm run dev` — start the API with auto-reload on http://localhost:3000
- `npm test` — run the full test suite (Node's built-in `node --test` runner)
- `npm run lint` — check code style with ESLint

## Conventions

- Use CommonJS (`require` / `module.exports`), not ES module `import` — ESLint is configured for `sourceType: "script"`.
- One route file per resource in `routes/`, mounted in `server.js`.
- All data access goes through `db/store.js` — never read or mutate the `users` array directly from a route.
- Validate input in the route: return `400` for bad input and `404` for a missing record.

## Architecture

- `server.js` is the entry point: it creates the app, adds `express.json()`, mounts the routers, and only calls `app.listen()` when run directly (`require.main === module`) so tests can import the app without opening a port.
- `routes/` holds one router per resource (`users.js`, `health.js`).
- `db/store.js` is an in-memory helper standing in for a database — data resets on every restart and is not persisted.
- `tests/` uses `node --test` with `supertest` against the exported `app`.
