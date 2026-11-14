# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

A small Express 4 REST API (users + health check) backed by an in-memory store; the starter app for the Claude Code course projects.

## Commands

- `npm install` — required before anything else (CI uses Node 22)
- `npm run dev` — start the API on http://localhost:3000 with `node --watch` (port comes from `PORT`)
- `npm test` — run all tests with the built-in Node test runner
- `node --test tests/users.test.js` — run one test file
- `node --test --test-name-pattern="GET /health"` — run tests whose name matches a pattern
- `npm run lint` — ESLint (`eslint:recommended`)

CI (`.github/workflows/ci.yml`) runs lint then tests on every push and PR; both must pass.

## Conventions

- Use CommonJS (`require` / `module.exports`), not ES modules — ESLint parses with `sourceType: "script"`, so `import`/`export` fails lint.
- Write tests with `node:test` and `node:assert` plus `supertest`; do not add Jest, Mocha, or another test framework.
- Tests import `app` from `server.js` and pass it to `supertest`; never call `app.listen()` or bind a port in a test.
- Route handlers never touch data directly — add a function to `db/store.js` and call it from the route.
- Return errors as JSON `{ "error": "<message>" }` with the matching status code (400 for validation, 404 for missing resources); successful creates return 201 with the created object.
- Never read or commit `.env`; document any new config variable in `.env.example` instead.

## Architecture

- `server.js` builds the Express app, mounts each router under its path prefix, and exports `app`. It only calls `listen()` when run directly (`require.main === module`), which is what lets tests import it without opening a port.
- `routes/` has one file per resource, each exporting an `express.Router()`. Adding a resource means a new file here plus an `app.use("/<resource>", ...)` line in `server.js`.
- `db/store.js` is the only data-access layer: module-level arrays standing in for a database. State resets on restart and is shared across all tests in a process, so tests should not assume exact record counts or IDs after a `POST`.
