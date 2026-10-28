# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

Small Express REST API (users + health check) backed by an in-memory store, used as the base project for the Claude Code course.

## Commands

- `npm run dev`: start the API on http://localhost:3000 with `node --watch` (set `PORT` to change it)
- `npm test`: run all tests with the built-in `node:test` runner
- `node --test tests/users.test.js`: run one test file
- `node --test --test-name-pattern="404" tests/`: run the tests whose names match a pattern
- `npm run lint`: run ESLint (`eslint:recommended`). CI runs lint and then tests on Node 22, so both must pass.

## Conventions

- Use CommonJS (`require` / `module.exports`), not ES modules. ESLint is configured with `sourceType: "script"`.
- Use `node:test` + `node:assert` + `supertest` for tests, not Jest or Mocha. Import `app` from `../server` and never call `listen()` in tests.
- Route handlers access data only through `db/store.js` functions. Never touch the `users` array directly from a route.
- Errors are returned as JSON `{ error: "<message>" }` with the right status (400 for validation, 404 when not found).
- Unused `req`, `res`, `next` and `_` arguments are allowed by the lint config. Don't rename them to silence warnings.

## Architecture

- `server.js` builds the Express app, mounts each router under its resource path (`/users`, `/health`) and exports `app`. It only calls `listen()` when run directly (`require.main === module`), so tests can import the app without opening a port.
- `routes/`: one file per resource, each exporting an `express.Router()`. A new resource means a new route file plus an `app.use()` line in `server.js`.
- `db/store.js`: in-memory stand-in for a database. Data resets on restart and is shared across tests in the same process (e.g. a `POST /users` in one test is visible to later ones). User ids are numbers, so route params must be converted with `Number()`.
- Config comes from environment variables (`.env.example` shows the shape). `.env` is git-ignored and must not be read or committed.
