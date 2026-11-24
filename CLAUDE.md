# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

Starter Express 4 API (users and health endpoints) used as the base project for the Claude Code course.

## Commands

- `npm run dev` — start on http://localhost:3000 with reload on change
- `npm test` — run all tests (Node's built-in runner)
- `node --test tests/users.test.js` — run one test file
- `node --test --test-name-pattern="returns 400" tests/users.test.js` — run one test by name
- `npm run lint` — ESLint

CI (Node 22) runs lint and then tests on every push and pull request.

## Conventions

- Use CommonJS (`require` / `module.exports`), not ES modules; ESLint parses files as scripts.
- Write tests with `node:test`, `node:assert`, and `supertest`, not Jest, Mocha, or Chai.
- In tests, pass the exported `app` to `supertest`; do not call `listen` or open a port.
- Return errors as `res.status(code).json({ error: "message" })`, not as plain text or another shape.
- Convert `:id` parameters with `Number(...)` before calling the store; it compares IDs with `===`.

## Architecture

- `server.js` builds and exports `app`, mounts each router, and calls `listen` only when run directly. Keep that guard, because the tests import `app`.
- `routes/` has one router file per resource. A new resource needs its own file there and an `app.use` line in `server.js`.
- `db/store.js` owns all data access. Routes call its exported functions and never hold data themselves.
- The store is in memory and synchronous. Its state resets on restart and is shared by all tests in a file, so tests must not depend on exact user counts or on the next ID.
- Nothing loads `.env` (there is no dotenv). `PORT` must be set in the shell environment.
