# CLAUDE.md

Small Express REST API (users + health check) that serves as the starter project for the Claude Code course.

## Commands

- `npm run dev` — start the API with auto-reload on http://localhost:3000 (port from `PORT`)
- `npm test` — run the tests (`node --test`)
- `npm run lint` — ESLint. CI runs lint, then tests, on Node 22; both must pass before a push.

## Conventions

- CommonJS only: `require` / `module.exports`, not `import` / `export` (ESLint parses files as scripts).
- Tests use `node:test` + `node:assert` with `supertest` against the exported `app` — not Jest or Mocha. Never call `app.listen()` in tests.
- Route handlers never touch the users array directly; all data access goes through functions in `db/store.js`.
- Errors are JSON `{ "error": "<message>" }` with the matching status (400 invalid input, 404 not found); a create returns 201 with the new resource.
- Don't add new dependencies unless the task requires it.

## Architecture

- `server.js` builds the Express app, mounts `/users` and `/health`, and exports `app`; it only listens when run directly.
- `routes/` holds one router file per resource. A new resource = new file in `routes/` + `app.use()` in `server.js` + tests in `tests/`.
- `db/store.js` is an in-memory store standing in for a database; data resets on every restart.
