# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

A small Express (Node.js) REST API serving a `users` resource from an in-memory store, used as the starter project for a Claude Code course.

## Commands

- `npm run dev` — start the API with auto-reload (`node --watch`) on `http://localhost:3000` (`PORT` overrides)
- `npm test` — run all tests with Node's built-in runner (`node --test`)
- `node --test tests/users.test.js` — run one test file
- `node --test --test-name-pattern="404" tests/` — run only tests whose name matches
- `npm run lint` — ESLint over the whole repo

CI runs lint then tests (Node 22); both must pass.

## Conventions

- CommonJS only: use `require` / `module.exports`, not `import` / `export`.
- Tests use `node:test` + `node:assert` + `supertest` against the exported `app` — do not add Jest/Mocha, and do not call `app.listen()` in tests.
- Route handlers never touch data directly: go through functions in `db/store.js`.
- Error responses are JSON shaped `{ error: "<message>" }` with the matching status (400 for bad input, 404 for missing resources); successful creates return 201.

## Architecture

- `server.js` builds the Express app, mounts each router under its path (`/users`, `/health`), and exports `app`. It only calls `listen()` when run directly (`require.main === module`), which is what lets tests import it.
- `routes/` holds one `express.Router()` file per resource. A new resource means a new file here plus an `app.use(...)` line in `server.js`.
- `db/store.js` is the only data layer — a module-level in-memory array that resets on restart. State is shared across tests in the same process, so tests must not assume a fixed user count after a `POST`.
- Config comes from environment variables (see `.env.example`); real values belong in `.env`, which must never be read or committed.
