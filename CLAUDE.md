# CLAUDE.md

REST API for managing users, built with Express (Node.js).

## Commands

- `npm run dev` — start the dev server on http://localhost:3000 (auto-restarts on changes)
- `npm test` — run all tests (uses Node's built-in test runner with supertest)
- `npm run lint` — check code style with ESLint

## Conventions

- Use `require` / `module.exports` (CommonJS), not ES module `import`/`export`.
- One route file per resource in `routes/` — mount it in `server.js` with `app.use`.
- Keep data access in `db/store.js`; routes never manipulate the data structures directly.
- Tests use `node:test` and `node:assert` with `supertest` — no external test framework.
- ESLint ignores unused function params named `_`, `req`, `res`, or `next`.

## Architecture

```
server.js          → entry point; creates the Express app, mounts routes, exports `app`
routes/users.js    → GET /users, GET /users/:id, POST /users
routes/health.js   → GET /health (liveness check)
db/store.js        → in-memory data store (resets on restart, no persistence)
tests/             → supertest-based integration tests that import `app` directly
```

The server only starts listening when `server.js` is run directly (`require.main === module`), so tests can import the app without opening a port.
