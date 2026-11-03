# CLAUDE.md

Starter Express REST API for `users`, backed by an in-memory store (no real database).

## Commands

- `npm run dev` — start the API with auto-reload on http://localhost:3000
- `npm test` — run all tests (Node's built-in test runner)
- `node --test tests/users.test.js` — run a single test file
- `npm run lint` — run ESLint (CI runs lint + tests on every push and PR)

## Architecture

- `server.js` — entry point; mounts routers and exports `app`. It only calls `app.listen` when run directly, so tests can import it — keep this pattern.
- `routes/` — one router file per resource (`users.js`, `health.js`), mounted in `server.js`.
- `db/store.js` — the only data access layer; state resets on restart.
- `tests/` — integration tests with `supertest` against the exported `app`.

## Conventions

- Access data only through `db/store.js`, never from a route directly.
- Return errors as `{ error: "..." }`: `400` for invalid input, `404` for a missing resource (see `routes/users.js`).
- Write tests with `node:test` + `supertest`, not Jest or Mocha.
- Use CommonJS (`require` / `module.exports`), not ES modules.
