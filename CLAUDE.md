# claude-course-starter

A small Express REST API exposing a `users` resource and a health check, backed by an in-memory store.

## Commands

- `npm run dev` — start the API on http://localhost:3000 with auto-reload
- `npm test` — run the test suite (`node --test`)
- `npm run lint` — check code style with ESLint

Run `npm run lint` and `npm test` before committing; CI runs both on every push and pull request.

## Conventions

- Use CommonJS (`require` / `module.exports`), not ESM `import` — `package.json` has no `"type": "module"`.
- Reach data only through `db/store.js`. Route files never touch the `users` array directly.
- Return errors as `res.status(code).json({ error: "message" })` — never as plain text or an HTML page.
- Add a new resource as its own file in `routes/`, exporting an Express `Router`, mounted in `server.js`.
- Every new or changed route gets a test in `tests/`, written with `node:test` + `supertest`.

## Architecture

`server.js` is the entry point: it builds the Express app, mounts the routers, and calls `listen()` only when run directly (`require.main === module`) so tests can import the app without opening a port.

`routes/` holds one file per resource — `users.js`, `health.js` — each mounted at its own path. `db/store.js` is the single data layer: an in-memory array standing in for a real database, so data resets on every restart.
