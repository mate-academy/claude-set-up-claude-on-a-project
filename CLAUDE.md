# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

A small Express REST API (users + health check) backed by an in-memory store, used as the starter project for the Claude Code course.

## Commands

- `npm run dev` — start the API with `node --watch` on http://localhost:3000 (`PORT` overrides)
- `npm test` — run all tests with the built-in Node test runner (`node --test`)
- `node --test tests/users.test.js` — run one test file
- `node --test --test-name-pattern="404" tests/users.test.js` — run tests whose name matches a pattern
- `npm run lint` — ESLint (`eslint:recommended`); CI runs lint then tests on Node 22, so both must pass

## Conventions

- Use CommonJS (`require` / `module.exports`), not ES modules — ESLint is configured with `sourceType: "script"`.
- Write tests with `node:test` + `node:assert` and hit routes via `supertest` against the exported `app`; do not add Jest/Mocha or start a real server in tests.
- Routes never touch data directly — add or change data access as functions in `db/store.js` and call them from the route.
- Error responses are JSON of the form `{ error: "<message>" }` with the matching status code (400 for invalid input, 404 for missing resources).
- Route params arrive as strings; convert ids with `Number(req.params.id)` before looking them up (store ids are numbers).

## Architecture

- `server.js` builds the Express app, mounts one router per resource (`/users`, `/health`), and exports `app`. It only calls `listen()` when run directly (`require.main === module`), which is what lets tests import it.
- `routes/` holds one file per resource, each exporting an `express.Router()`; a new resource means a new file here plus an `app.use()` line in `server.js`.
- `db/store.js` is a module-level in-memory array standing in for a database. State resets on restart but is shared across tests in the same process, so tests that create users affect later assertions.
