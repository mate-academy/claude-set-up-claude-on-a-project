# claude-course-starter

A small Express API (users + health check) backed by an in-memory store.

## Commands
- `npm run dev` — start the API on http://localhost:3000 (auto-restarts on change)
- `npm test` — run the test suite (`node --test`)
- `npm run lint` — check code style with ESLint

## Conventions
- Use `require`/`module.exports` (CommonJS), not ES module `import`/`export` — the project has no `"type": "module"`.
- One route file per resource under `routes/` (e.g. `users.js`, `health.js`), each exporting an `express.Router()`.
- All data access goes through `db/store.js` — routes never touch the in-memory `users` array directly.
- Route handlers validate required body fields and return `400`/`404` with `{ error: "..." }` on failure, matching the existing handlers in `routes/users.js`.

## Architecture
- `server.js` is the entry point: builds the Express app, mounts `routes/users.js` at `/users` and `routes/health.js` at `/health`, and only calls `app.listen` when run directly (so tests can `require` the app without opening a port).
- `db/store.js` is a tiny in-memory data helper (no real database) — data resets on every restart.
- `tests/` holds `supertest`-based tests that exercise the routes through the exported `app`.
