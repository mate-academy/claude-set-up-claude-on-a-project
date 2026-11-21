## Description

Express API starter for the Claude Code course — a simple REST service with user management, health checks, and an in-memory data store.

## Commands

- `npm run dev` — start the Vite/dev server (or `npm run dev` for the API on http://localhost:3000)
- `npm run test` — run the test suite with vitest/supertest
- `npm run lint` — check code style with ESLint

## Conventions

- **Single source of truth**: The `PROJECTS`/`users` array and `db/store.js` are the only way to manage user data — do not modify data directly without going through the defined routes
- **ES modules / CommonJS**: `server.js` uses CommonJS (`require`/`module.exports`); test files may import via `require`; do not mix `import`/`export` with `require` in the same module unless intentionally transpiled
- **Test isolation**: Each test starts with a fresh server instance; do not rely on shared state across tests — use `supertest` to call endpoints rather than accessing the app's internal state directly
- **Lint rules**: ESLint is configured with `no-unused-vars` warning mode; avoid defining variables that are never used, and respect the `argsIgnorePattern` setting

## Architecture

- **Entry point**: `server.js` creates an Express app and starts listening on port 3000 (or `process.env.PORT`)
- **Routes**: One route file per resource in `routes/` — `health.js` provides a liveness check, `users.js` handles user CRUD operations
- **Data access**: `db/store.js` is an in-memory store that stands in for a real database; it resets on every restart and exports `getAllUsers`, `getUserById`, `createUser`
- **Test setup**: Tests in `tests/` use `supertest` to make HTTP requests against the app; they do not start the server themselves