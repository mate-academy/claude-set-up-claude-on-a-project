# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

A small Express REST API (users + health check) with an in-memory store, used as the starter project for a Claude Code course.

## Commands

- `npm run dev` — start the API on http://localhost:3000 with `node --watch` (override with `PORT`)
- `npm test` — run all tests (`node --test`, built-in runner, no Jest/Mocha)
- `node --test --test-name-pattern="404" tests/users.test.js` — run a single test by name
- `npm run lint` — ESLint (`eslint:recommended`); CI runs lint then tests on Node 22, both must pass

## Conventions

- CommonJS only: use `require` / `module.exports`, not `import` / `export` (ESLint `sourceType: "script"`).
- Routes never touch data directly; all reads/writes go through functions exported from `db/store.js`. Add a store function rather than mutating `users` from a route.
- Error responses are JSON `{ error: "<message>" }` with the matching status (400 validation, 404 not found); return early with `return res.status(...).json(...)`.
- Route params are strings — convert ids with `Number(req.params.id)` before calling the store (store ids are numbers).
- Write tests with `node:test` + `node:assert` + `supertest`, calling `request(app)` against the exported app — never start a real server in tests.

## Architecture

- `server.js` builds the Express app, mounts one router per resource (`/users` → `routes/users.js`, `/health` → `routes/health.js`), and exports `app`. It only calls `listen()` when run directly (`require.main === module`), which is what lets tests import it.
- `routes/` — one `express.Router()` file per resource; a new resource means a new file plus an `app.use(...)` line in `server.js`.
- `db/store.js` — module-level in-memory array standing in for a database; resets on restart. State is shared across tests in the same process, so tests that create users affect later list results.
