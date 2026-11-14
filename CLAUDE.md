# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

Small Express REST API (users + health check) backed by an in-memory store; used as the starter project for the Claude Code course.

## Commands

- `npm run dev` — start the API with `node --watch` on http://localhost:3000 (`PORT` env overrides)
- `npm test` — run all tests with the built-in `node:test` runner
- `node --test tests/users.test.js` — run one test file; add `--test-name-pattern="404"` to run a single test
- `npm run lint` — ESLint (`eslint:recommended`); CI runs lint then tests on Node 22, so both must pass

## Conventions

- CommonJS only: use `require` / `module.exports`, not `import` / `export` (ESLint is configured with `sourceType: "script"`).
- One `express.Router()` file per resource in `routes/`, mounted in `server.js` with `app.use("/<resource>", ...)`.
- Routes never touch data directly — go through functions exported from `db/store.js`; add new data operations there.
- Error responses use the shape `{ error: "<message>" }` with the matching status (400 for validation, 404 for missing).
- Route params are strings: convert with `Number(req.params.id)` before calling the store.
- Tests use `node:test` + `node:assert` + `supertest` against the exported `app` — never start a real server in tests.

## Architecture

- `server.js` builds the app, registers `express.json()` and the routers, and only calls `listen()` when run directly (`require.main === module`); it exports `app` for tests.
- `db/store.js` holds module-level state (`users` array, `nextId` counter). It resets on restart and is shared across all tests in the same file, so a `POST /users` in one test changes what later tests see. Getters return live references, not copies.
- `.env` is git-ignored; `.env.example` documents the only config (`PORT`).
