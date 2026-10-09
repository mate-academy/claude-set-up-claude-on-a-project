# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

Small Express REST API (users + health check) with an in-memory data store.

## Commands

- `npm run dev` — start the API on http://localhost:3000 with auto-restart (`node --watch`)
- `npm test` — run all tests (Node's built-in `node:test` runner)
- `node --test tests/users.test.js` — run one test file; add `--test-name-pattern="404"` to run matching tests only
- `npm run lint` — ESLint (`eslint:recommended`, ESLint 8)

## Conventions

- CommonJS only: `require` / `module.exports`, not `import` / `export` (ESLint is set to `sourceType: "script"`).
- Tests use `node:test` + `node:assert` + `supertest`, not Jest or Mocha. Import `app` from `../server` and call `request(app)`; never start a real server in tests.
- Route handlers never touch data directly; all reads and writes go through functions exported from `db/store.js`.
- Errors are returned as JSON `{ "error": "<message>" }` with the matching status code (400 for missing fields, 404 for not found).

## Architecture

- `server.js` builds the Express app, mounts one router per resource (`app.use("/users", ...)`), and exports `app`. It only calls `listen` when run directly (`require.main === module`), which is what lets tests import it.
- `routes/<resource>.js` — one `express.Router()` per resource. A new resource means a new file here plus an `app.use` line in `server.js`.
- `db/store.js` — module-level arrays standing in for a database. Data resets on every restart; IDs are numbers, so route params are converted with `Number(req.params.id)`.
- Config comes from environment variables (`PORT`); see `.env.example`. Real values live in `.env`, which must never be read or committed.
