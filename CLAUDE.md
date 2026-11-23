# CLAUDE.md

A small Express API with user and health-check routes.

## Commands

- `npm run dev` — start the API with `node --watch` on http://localhost:3000 (`PORT` env var overrides)
- `npm test` — run all tests with the built-in `node --test` runner (no Jest/Mocha)
- `node --test tests/users.test.js` — run a single test file; add `--test-name-pattern="<regex>"` to run one test
- `npm run lint` — ESLint (`eslint:recommended`)

## Architecture

Small Express 4 API using CommonJS (`require`, `sourceType: "script"`, not ES modules).
- `server.js` — builds the Express `app`, mounts routers (`/users`, `/health`), and exports `app`. It only calls `listen()` when run directly (`require.main === module`), so tests import `app` with supertest without opening a port. Keep that guard.
- `routes/` — one router file per resource, mounted in `server.js`. New resources need a router file plus a `app.use(...)` line there.
- `db/store.js` — in-memory data store standing in for a database. Routes call its functions rather than touching data directly.
- `tests/` — supertest-based tests against the exported `app`.

Config goes in `.env` (git-ignored); `.env.example` is the template.

## Conventions

- ESLint ignores unused args named `_`, `req`, `res`, `next`.
- Validation errors return `{ error: "<message>" }` with 400/404 status codes.
- use spaces, not tabs
- **Package Manager:** Use `npm`, not `pnpm` or `yarn`.
