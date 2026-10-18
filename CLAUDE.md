# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

Starter Express REST API (users + health check) with an in-memory data store, used as the base project for a Claude Code course.

## Commands

- `npm run dev` — start the API with auto-reload on http://localhost:3000 (`PORT` overrides)
- `npm test` — run all tests (Node's built-in runner, `node --test`)
- `node --test tests/users.test.js` — run one test file; add `--test-name-pattern="404"` to run a single test
- `npm run lint` — ESLint (`eslint:recommended`)

CI (`.github/workflows/ci.yml`) runs `npm run lint` then `npm test` on Node 22 — both must pass.

## Conventions

- CommonJS only: use `require` / `module.exports`, not `import` / `export` (ESLint is configured with `sourceType: "script"`).
- Tests use `node:test` + `node:assert` + `supertest` against the exported `app` — not Jest/Mocha, and never start a real server in tests.
- Route handlers access data only through `db/store.js` functions; never import or mutate the `users` array directly.
- Error responses are JSON shaped `{ error: "<message>" }` with the matching status code (400 for validation, 404 for not found).
- Precede each route handler with a `// METHOD /path — description` comment, matching existing routes.

## Architecture

- `server.js` builds the Express app, mounts each router at its resource path (`/users`, `/health`), and exports `app`. It only calls `listen()` when run directly (`require.main === module`) so tests can import it.
- `routes/` holds one `express.Router()` file per resource. A new resource means a new file here plus an `app.use(...)` line in `server.js`.
- `db/store.js` is an in-memory stand-in for a database: module-level state that resets on restart and is shared across all tests in a process (e.g. `POST /users` in one test is visible to later ones).
- Configuration comes from environment variables; `.env.example` documents them. Never read or commit `.env`.
