# CLAUDE.md

A small Express REST API that serves users (`/users`) and a liveness check (`/health`) from an in-memory store.

## Commands
- `npm run dev` - start the API on http://localhost:3000 (restarts on file changes)
- `npm test` - run the tests (Node's built-in test runner + supertest)
- `npm run lint` - ESLint; must pass before any commit (CI runs lint, then tests)

## Conventions
- CommonJS only: `require` / `module.exports`, never `import` / `export`.
- One route file per resource in `routes/`, exporting an `express.Router()`; mount it in `server.js`, nowhere else.
- Routes never touch the `users` array directly - all data access goes through the functions in `db/store.js`.
- Errors return JSON `{ "error": "<message>" }` with the right status (400 for bad input, 404 for not found).
- Every new or changed route gets a test in `tests/` using `request(app)` from supertest - never start a real port in tests.

## Architecture
- `server.js` - builds the Express app, mounts the routers, only calls `listen()` when run directly, and exports `app` for the tests.
- `routes/` - `users.js`, `health.js`; HTTP handling and input validation only.
- `db/store.js` - in-memory data; resets on every restart, so nothing persists.
- Config comes from environment variables (`PORT`); see `.env.example`. Never read or print `.env`.
