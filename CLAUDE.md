# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

A small Express (Node.js) REST API serving users and a health check, backed by an in-memory store.

## Commands

- `npm run dev`: start the API with auto-reload (`node --watch`) on http://localhost:3000 (or `$PORT`)
- `npm test`: run all tests with the built-in Node test runner (`node --test`)
- `node --test tests/users.test.js`: run one test file
- `node --test --test-name-pattern="404"`: run only the tests whose name matches
- `npm run lint`: run ESLint (`eslint:recommended`)

CI (`.github/workflows/ci.yml`, Node 22) runs `npm run lint` and then `npm test` on every push and PR, so both must pass.

## Conventions

- Use CommonJS (`require` / `module.exports`), not ES modules. ESLint is set to `sourceType: "script"`.
- Route handlers read and write data only through `db/store.js`. Don't keep data in route files.
- Send errors as JSON in the form `{ error: "<message>" }` with the right status code (400 for validation, 404 for not found).
- Write tests with `node:test` + `node:assert` + `supertest`, not Jest or Mocha. Import `app` from `../server` and never call `listen()` in tests.
- Route params arrive as strings. Convert them with `Number(req.params.id)` before looking them up in the store, because ids are numeric.

## Architecture

- `server.js` builds the Express app, mounts one router per resource (`/users` → `routes/users.js`, `/health` → `routes/health.js`) and exports `app`. It only calls `listen()` when run directly (`require.main === module`), which is what lets the tests import the app without opening a port.
- `routes/`: one `express.Router()` per resource. A new resource means a new file here, mounted in `server.js`.
- `db/store.js`: an in-memory stand-in for a database (seeded users, auto-increment `nextId`). State is reset on restart but is shared across tests in the same process, so tests must not rely on exact counts or ids.
- Config comes only from environment variables (`PORT`). No `.env` loader is installed, so `.env` is not read automatically. `.env.example` documents the variables.
