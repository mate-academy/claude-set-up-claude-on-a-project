# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

A small Express REST API (users + health check) backed by an in-memory store; it is the starter project for the Claude Code course.

## Commands

- `npm run dev`: start the API with auto-reload on http://localhost:3000 (`PORT` env var overrides the port)
- `npm test`: run all tests (Node's built-in `node:test` runner + supertest)
- `node --test tests/users.test.js`: run one test file
- `node --test --test-name-pattern="404" tests/users.test.js`: run tests whose name matches
- `npm run lint`: ESLint (`eslint:recommended`); CI runs lint, then tests, on Node 22

## Conventions

- CommonJS only: use `require` / `module.exports`, not `import` / `export` (ESLint is set to `sourceType: "script"`).
- Tests use `node:test` + `node:assert` with `supertest`. Do not add Jest, Mocha or another runner.
- Tests import `app` from `server.js`, never a running server. `server.js` only calls `listen()` when run directly, so keep that `require.main === module` guard.
- Route handlers never touch data directly; they go through functions exported from `db/store.js`.
- Error responses are JSON shaped `{ error: "<message>" }` with the right status (400 for validation, 404 for not found).
- Route params arrive as strings. Convert them (e.g. `Number(req.params.id)`) before looking anything up in the store, because the store compares ids with `===`.
- Never read or edit `.env`. Document new config keys in `.env.example`.

## Architecture

- `server.js` is the entry point. It builds the Express app, adds `express.json()`, mounts each router under its path (`/users`, `/health`) and exports `app`.
- `routes/` has one `express.Router()` file per resource. A new resource gets its own file plus an `app.use(...)` line in `server.js`.
- `db/store.js` is a module-level in-memory store (seeded with two users, auto-increment ids). It resets when the server restarts but is shared across every test in one process, so tests that create data can affect later assertions.
