# claude-course-starter

Small Express REST API (users + health check) backed by an in-memory store.

## Commands

- `npm run dev` — start the API on http://localhost:3000 with auto-reload
- `npm test` — run tests (Node's built-in `node:test` + supertest)
- `npm run lint` — ESLint; CI runs lint then tests, so run both before committing

## Conventions

- CommonJS only: use `require` / `module.exports`, not `import` / `export`.
- Tests use `node:test` and `node:assert`, not Jest or Mocha. Put them in `tests/<resource>.test.js` and hit the app through `supertest(app)`; never call `app.listen` in tests.
- Route handlers never touch data directly; add a function to `db/store.js` and call that.
- Errors are JSON `{ "error": "<message>" }` with the right status (400 invalid input, 404 not found); successful creates return 201.
- Don't add dependencies without asking.

## Architecture

- `server.js` builds the Express app, mounts routers, and exports `app`; it only listens when run directly.
- `routes/` — one router file per resource (`users.js` → `/users`, `health.js` → `/health`). A new resource means a new file here plus one `app.use` line in `server.js`.
- `db/store.js` — the only data layer. In-memory, so data resets on every restart.
