# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

A small Express REST API (users + health check) with an in-memory store, used as the starter project for a Claude Code course.

## Commands

- `npm run dev` — start the API with `node --watch` on http://localhost:3000 (`PORT` env var overrides)
- `npm test` — run all tests with the built-in Node test runner (`node --test`)
- `node --test tests/users.test.js` — run one test file
- `node --test --test-name-pattern="404" tests/` — run tests whose name matches a pattern
- `npm run lint` — ESLint (`eslint:recommended`)

CI (`.github/workflows/ci.yml`) runs `npm run lint` then `npm test` on Node 22, so both must pass.

## Architecture

- **`server.js` is the entry point.** It builds the Express app, mounts each router (`/users`, `/health`), and exports `app`. It calls `listen()` only when run directly (`require.main === module`), so tests can import `app` without opening a port.
- **One route file per resource in `routes/`.** Each file (`users.js`, `health.js`) exports one `express.Router()`. Handlers validate input and return errors as `{ error: "..." }` with the right status code (400, 404).
- **Data access goes through `db/store.js`.** It is the only data layer: plain functions over an in-memory array. It resets on restart, and its state is shared across the whole process, including all tests in a run.

## Conventions

- Use CommonJS `require` / `module.exports`, not ES module `import` / `export` (ESLint uses `sourceType: "script"`).
- Use `db/store.js` functions for data access, not arrays or data kept inside route files.
- Use a new file in `routes/` for each new resource, mounted in `server.js`, not more routes added to an existing file.
- Use `node:test` + `node:assert` + `supertest` against the exported `app`, not Jest or Mocha. Tests go in `tests/*.test.js`.
- Use `npm test` to run tests, not `npx jest` or other runners.
- Use `req`, `res`, `next`, or `_` as names for unused handler params, not other names, which trigger lint warnings.
- Use `.env` (copied from `.env.example`) for secrets, not values hard-coded in code.
