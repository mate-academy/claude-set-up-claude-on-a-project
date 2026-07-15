# CLAUDE.md

A small Express REST API (users + health check) backed by an in-memory store — the starter project for the Claude Code course.

## Commands

- `npm run dev` — start the API with auto-reload on http://localhost:3000
- `npm test` — run the test suite (`node --test`, uses supertest)
- `npm run lint` — check code style with ESLint

Requires **Node 18+** (`node --test` and `node --watch` are used). On older Node these scripts fail with `bad option: --test`.

## Conventions

- Use `require`/`module.exports` (CommonJS), not ESM `import`. ESLint is configured with `sourceType: "script"`.
- Add one route file per resource under `routes/`, mount it in `server.js` with `app.use("/resource", ...)`. Don't put route handlers in `server.js`.
- All data access goes through `db/store.js`. Route files call store functions; they never hold their own data.
- Use double quotes and keep the existing 2-space indentation.
- Validate request input in the route and return the right status (`400` for bad input, `404` for missing resource) before touching the store.

## Architecture

- `server.js` — entry point: creates the Express app, adds `express.json()`, mounts the route modules, and only calls `listen()` when run directly (so tests can import `app` without opening a port).
- `routes/` — one Express `Router` per resource (`users.js`, `health.js`).
- `db/store.js` — a tiny in-memory store (seeded users, auto-incrementing id). Data resets on restart; there is no real database.
- `tests/` — `node:test` + `supertest` hitting the imported `app`.

Config comes from environment variables (`PORT`); real secrets belong in `.env` (git-ignored), never committed.
