# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

A small Express REST API (users + health check) backed by an in-memory store.

## Commands

- `npm run dev` — start the API with `node --watch` on `http://localhost:3000` (port from `PORT`)
- `npm test` — run all tests with the built-in `node:test` runner
- `node --test tests/users.test.js` — run one test file; add `--test-name-pattern="<name>"` to run a single test

## Conventions

- Use CommonJS (`require` / `module.exports`), not ES modules — ESLint is configured with `sourceType: "script"`.
- Routes never touch data directly; read and write through the functions exported by `db/store.js`.
- Error responses are JSON shaped `{ error: "<message>" }` with the matching status (400 for validation, 404 for missing).
- Tests use `node:test` + `node:assert` + `supertest` against the exported `app`; don't add Jest/Mocha or start a real server in tests.

## Architecture

- `server.js` builds the Express app, mounts each router under its path (`/users`, `/health`), and only calls `listen()` when run directly (`require.main === module`) so tests can import `app`.
- `routes/` holds one `express.Router()` per resource; a new resource gets its own file and a `app.use()` line in `server.js`.
- `db/store.js` is an in-memory stand-in for a database — data resets on every restart, and state persists across tests within one process.
