# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

A minimal Express API for the Claude Code course, backed by an in-memory data store (no real database or auth).

## Commands

- `npm run dev` — start the API on http://localhost:3000 with auto-reload (`node --watch`)
- `npm test` — run all tests (Node's built-in `node:test` runner + supertest)
- `node --test tests/users.test.js` — run a single test file
- `node --test --test-name-pattern="404"` — run tests matching a name
- `npm run lint` — run ESLint (`eslint:recommended`)

CI (`.github/workflows/ci.yml`) runs `npm install`, `npm run lint`, and `npm test` on every push/PR.

## Conventions

- Route handlers stay thin: validate input and shape the HTTP response, but delegate all data access to `db/store.js` — never mutate the `users` array from a route file.
- One route file per resource under `routes/`, mounted in `server.js` (e.g. `routes/users.js` → `/users`).
- `server.js` exports the `app` without calling `.listen()` when required as a module (guarded by `require.main === module`), so tests can import it directly via supertest without opening a port.

## Architecture

- `server.js` — entry point; wires up `express.json()` and mounts each resource router.
- `routes/` — one file per resource (`users.js`, `health.js`); routers only, no data logic.
- `db/store.js` — the only place that touches data; an in-memory array that resets on every restart (no persistence).
- `tests/` — supertest-driven HTTP tests against the exported `app`.
