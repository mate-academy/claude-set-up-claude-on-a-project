# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

Starter Express API for the Claude Code course: a minimal `/users` and `/health` service backed by an in-memory store.

## Commands
- Dev server (auto-restart): `npm run dev` — starts on http://localhost:3000
- Run tests: `npm test`
- Lint: `npm run lint`
- Run a single test file: `node --test tests/users.test.js`

## Conventions
- CommonJS throughout (`require`/`module.exports`), not ESM.
- One route file per resource under `routes/`, mounted in `server.js`.
- `server.js` only starts listening when run directly (`require.main === module`), so tests can `require("../server")` and drive it with supertest against an unbound app.

## Architecture
- `server.js` — entry point; wires up route modules and starts the server.
- `routes/` — one file per resource (`users.js`, `health.js`); route handlers call into `db/store.js` rather than manipulating data directly.
- `db/store.js` — in-memory data store standing in for a real database; data resets on every restart.
- `tests/` — uses Node's built-in `node:test` + `supertest` against the exported `app`, not a running server.
