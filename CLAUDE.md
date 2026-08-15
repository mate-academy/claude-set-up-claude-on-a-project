# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

Starter Express API used for the Claude Code course. It exposes a `/users` and `/health` resource backed by an in-memory store — there is no real database yet.

## Commands

- `npm run dev` — start the API on http://localhost:3000 with auto-restart (`node --watch`)
- `npm test` — run the test suite (Node's built-in test runner + supertest)
- `npm test -- --test-name-pattern="<name>"` — run a single test by name
- `npm run lint` — check code style with ESLint

## Conventions

- One route file per resource in `routes/`, mounted in `server.js` (e.g. `routes/users.js` → `app.use("/users", ...)`). Add new resources the same way rather than growing an existing route file.
- Routes never touch data directly — they call into `db/store.js`. Add new data operations there, not inline in route handlers.
- `server.js` only starts listening when run directly (`require.main === module`), so tests import `app` without opening a real port. Keep that guard when touching `server.js`.

## Architecture

- `server.js` — Express app entry point; wires up `express.json()` and mounts each resource router.
- `routes/` — one file per resource (`users.js`, `health.js`); handles HTTP concerns (params, status codes) and delegates data access to `db/store.js`.
- `db/store.js` — in-memory data layer standing in for a real database; state resets on every restart.
- `tests/` — Node test runner + supertest, importing the exported `app` from `server.js` directly (no server process needed).
