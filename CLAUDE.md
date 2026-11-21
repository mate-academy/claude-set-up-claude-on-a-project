# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

Small Express (Node.js) REST API with in-memory users and health endpoints, used as the starter project for a Claude Code course.

## Commands

- `npm run dev` — start the API on http://localhost:3000 with auto-restart (`node --watch`)
- `npm test` — run all tests (Node's built-in `node --test` runner)
- `node --test --test-name-pattern="404" tests/` — run only tests whose name matches
- `npm run lint` — ESLint (`eslint:recommended`); CI runs lint then test on Node 22

## Conventions

- Use CommonJS (`require` / `module.exports`), not ES modules — ESLint is configured with `sourceType: "script"`.
- Use the built-in `node:test` and `node:assert` with `supertest` for tests, not Jest or Mocha. Import `app` from `server.js`; never call `app.listen` in tests.
- Return errors as JSON `{ error: "<message>" }` with the matching status code (400 for invalid input, 404 for not found).
- Route handlers access data only through functions exported by `db/store.js`, never by touching the data arrays directly.

## Architecture

- `server.js` builds the Express app, mounts each router under its path (`/users`, `/health`), and exports `app`. It only listens on `PORT` when run directly (`require.main === module`), which is what lets tests import it.
- `routes/` holds one file per resource, each exporting an `express.Router()`. A new resource means a new route file plus an `app.use(...)` line in `server.js`.
- `db/store.js` is an in-memory stand-in for a database: data resets on every restart, and tests share the same process state.
