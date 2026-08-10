## Commands

- `npm run dev` — start the API on http://localhost:3000 with auto-reload
- `npm test` — run the tests in `tests/` (Node's built-in test runner + supertest)
- `npm run lint` — check code style with ESLint

## Conventions

- Use `require`/`module.exports` (CommonJS), not ES module `import`/`export`.
- One route file per resource in `routes/`, mounted in `server.js` — don't add routes directly to `server.js`.
- All data access goes through `db/store.js`; routes never touch the `users` array directly.
- Validate request bodies in the route handler and return `400` with `{ error: "..." }` on bad input, `404` with the same shape when a resource isn't found.

## Architecture

- `server.js` is the entry point: builds the Express app, mounts `routes/users.js` at `/users` and `routes/health.js` at `/health`, and only calls `app.listen` when run directly (so tests can `require("../server")` without opening a port).
- `db/store.js` is a tiny in-memory data helper — no real database, no persistence across restarts.