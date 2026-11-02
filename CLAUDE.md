# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

A small Express REST API (users + health check) backed by an in-memory store; used as the starter project for a Claude Code course.

## Commands

- `npm run dev` — start the API with auto-reload on http://localhost:3000 (`PORT` overrides)
- `npm test` — run all tests with Node's built-in runner (`node --test`)
- `node --test --test-name-pattern="404" tests/users.test.js` — run a single test by name
- `npm run lint` — ESLint (`eslint:recommended`); CI runs lint then tests on Node 22, so both must pass

## Conventions

- CommonJS only (`require` / `module.exports`, `sourceType: "script"`) — do not use ES `import`/`export`.
- Tests use `node:test` + `node:assert` + `supertest` — not Jest or Mocha. Import `app` from `server.js`; never call `app.listen` in tests.
- Route handlers access data only through functions exported from `db/store.js`, never by touching the arrays directly.
- Error responses are JSON `{ error: "<message>" }` with the matching status (400 for validation, 404 for missing).
- Convert `req.params.id` with `Number()` before lookups — store ids are numbers.
- This is a course project: do not change app code unless explicitly asked.

## Architecture

- `server.js` builds the Express app, mounts each router under its resource path (`/users`, `/health`), and only calls `listen` when run directly (`require.main === module`) so tests can import `app`.
- `routes/` holds one `express.Router` file per resource; add a new resource as a new file and mount it in `server.js`.
- `db/store.js` is module-level in-memory state that resets on restart and is shared across all tests in a process — tests that create users affect later tests.
