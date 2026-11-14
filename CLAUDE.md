# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

A small Express 4 REST API (users + health check) backed by an in-memory store; the starter app for the Claude Code course projects.

## Commands

- `npm install` — install dependencies
- `npm run dev` — start the API on http://localhost:3000 with `node --watch` (override the port with `PORT`)
- `npm test` — run all tests with the built-in Node test runner (`node --test`)
- `node --test tests/users.test.js` — run one test file
- `node --test --test-name-pattern="POST /users"` — run tests whose name matches a pattern
- `npm run lint` — ESLint (`eslint:recommended`)

CI (`.github/workflows/ci.yml`) runs lint then tests on Node 22; both must pass.

## Conventions

- Use CommonJS (`require` / `module.exports`), not ES modules — ESLint parses files as `sourceType: "script"`, so `import`/`export` fails lint.
- Write tests with `node:test` and `node:assert` plus `supertest` against the exported `app`; do not add Jest, Mocha, or another test framework.
- Route handlers never hold data themselves — read and write only through functions exported from `db/store.js`. Add a new store function rather than touching the `users` array from a route.
- Return errors as JSON in the shape `{ "error": "<message>" }` with the matching status code (400 for invalid input, 404 for missing resources).
- Put a one-line `// METHOD /path — what it does` comment above each route handler.
- Never read or commit `.env`; document new config variables in `.env.example` instead.

## Architecture

- `server.js` builds the Express app, mounts each router under its path prefix, and exports `app`. It only calls `listen()` when run directly (`require.main === module`), which is what lets tests import the app without opening a port — keep that guard.
- `routes/` has one file per resource, each exporting an `express.Router()`. Adding a resource means a new file in `routes/` plus an `app.use("/<resource>", ...)` line in `server.js`.
- `db/store.js` is the only data layer: module-level in-memory state seeded with two users, reset on every restart. Because that state is shared across all tests in a process, tests must not assume exact user counts or IDs after a `POST`.
