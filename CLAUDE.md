# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

Starter Express API for the Claude Code course — a minimal `/users` and `/health` REST service backed by an in-memory store.

## Commands

- `npm run dev` — start the API on http://localhost:3000 with auto-restart (`node --watch`)
- `npm test` — run the test suite (Node's built-in test runner via `node --test`)
- `npm run lint` — check code style with ESLint

There is no per-test filter script; run a single test file directly, e.g. `node --test tests/users.test.js`.

## Conventions

- CommonJS throughout (`require`/`module.exports`), not ESM `import`/`export`.
- Double quotes and semicolons, matching the existing files; ESLint (`eslint:recommended`) enforces the rest.
- One route file per resource under `routes/` (e.g. `users.js`, `health.js`), each exporting an `express.Router()`.

## Architecture

- `server.js` is the entry point: it builds the Express `app`, mounts each router from `routes/`, and only calls `app.listen` when run directly (`require.main === module`) — this lets `tests/` import `app` and drive it with `supertest` without opening a real port.
- Route handlers do not touch data directly; they call into `db/store.js`, a tiny in-memory module (`getAllUsers`, `getUserById`, `createUser`) that stands in for a real database. Data resets on every server restart.
- Config comes from environment variables (see `.env.example`); `.env` is git-ignored.
