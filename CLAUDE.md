# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev     # start server with hot-reload (node --watch)
npm start       # start server without hot-reload
npm test        # run all tests (node --test)
npm run lint    # lint with ESLint
```

Run a single test file:
```bash
node --test tests/users.test.js
```

## Conventions
Use CamelCase convention for variables

## Architecture

This is a minimal Express REST API. The entry point is `server.js`, which wires up two route modules and conditionally starts the HTTP server (skipped when `require.main !== module` so tests can import the app without binding a port).

- `db/store.js` — in-memory data store (no persistence; resets on restart). All data access goes through its exported functions.
- `routes/users.js` — CRUD endpoints under `/users`; uses `store` directly.
- `routes/health.js` — liveness check at `GET /health`.
- `tests/users.test.js` — integration tests using Node's built-in `node:test` runner and `supertest`.

The store is module-level state, which means tests share it across test runs within the same process. Keep this in mind when adding tests that mutate data (e.g. POST /users).
