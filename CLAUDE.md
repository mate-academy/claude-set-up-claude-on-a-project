# Project

Express REST API for users (list, get, create) plus a health check, backed by an in-memory store.

# Commands

- `npm run dev` — start the API on http://localhost:3000, restarting on file changes
- `npm test` — run all tests (Node's built-in runner); one file: `node --test tests/users.test.js`
- `npm run lint` — ESLint; CI runs lint then tests, so both must pass

# Conventions

- CommonJS only: `require` / `module.exports`, never `import` / `export`.
- Error responses are JSON `{ error: "message" }` — 400 for invalid input, 404 for missing records; successful creates return 201.
- Put a `// METHOD /path — what it does` comment above each route handler.
- Tests use `node:test` + `node:assert` + `supertest` against the exported `app`, not Jest or Mocha.

# Architecture

- `server.js` is the entry point: it mounts one router per resource and exports `app`. It only calls `listen()` when run directly, so tests can import `app` without opening a port — keep that guard.
- `routes/` holds one file per resource (`users.js`, `health.js`); paths inside are relative to the mount point.
- `db/store.js` is the only data-access layer; routes call its functions and never hold data themselves. Data is in memory and resets on restart.
- `tests/` holds the automated tests. The store is shared across all tests in a run, so don't assume a fixed user count or IDs.
