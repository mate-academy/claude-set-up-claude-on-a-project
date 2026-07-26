# CLAUDE.md

Express API starter for the Claude Code course — a small users/health HTTP API with an in-memory store.

## Commands

- `npm run dev` — start the API with reload on http://localhost:3000
- `npm test` — run the Node test suite
- `npm run lint` — run ESLint on the project

## Conventions

- Use CommonJS (`require` / `module.exports`), not ESM `import`/`export`.
- Keep data access in `db/store.js`; route handlers call the store, they do not hold or mutate collections themselves.
- Return JSON error bodies as `{ error: "..." }` with the matching HTTP status (400 validation, 404 missing resource).
- Export the Express `app` from `server.js` and only call `listen` when the file is the process entry point (`require.main === module`), so tests can import the app without opening a port.

## Architecture

- `server.js` is the entry point: creates the app, mounts routers, exports `app`.
- One resource per file under `routes/` (e.g. `routes/users.js`, `routes/health.js`), each exporting an Express router.
- Persistence is a tiny in-memory helper in `db/store.js` (resets on restart).
- Tests live in `tests/` and hit the app via Supertest + `node:test`.
