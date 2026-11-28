# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

A small Express REST API (users + health check) backed by an in-memory store, used as the starter project for a Claude Code course.

## Commands

- `npm run dev` — start the API on http://localhost:3000 with `node --watch` (port from `PORT`, see `.env.example`)
- `npm test` — run all tests with Node's built-in runner (`node --test`)
- `node --test tests/users.test.js` — run one test file
- `node --test --test-name-pattern="404"` — run tests whose name matches a pattern
- `npm run lint` — ESLint (`eslint:recommended`, ESLint 8 with `.eslintrc.json`)

CI (`.github/workflows/ci.yml`) runs `npm install`, `npm run lint`, `npm test` on Node 22 — both must pass.

## Conventions

- Use CommonJS (`require` / `module.exports`), not ES modules — ESLint is configured with `sourceType: "script"`.
- Tests use `node:test` + `node:assert` + `supertest`, not Jest/Mocha. Import `app` from `../server` and call `request(app)`; never start a real server in tests.
- Route handlers never touch data directly — all reads/writes go through functions exported from `db/store.js`. Add a new store function rather than mutating arrays in a route.
- Error responses are JSON of the form `{ error: "<message>" }` with the matching status code (400 for validation, 404 for missing resources); successful creates return 201.
- Convert `req.params.id` with `Number(...)` before lookup — store ids are numbers.
- The README states this project is for setting up Claude Code, not for changing app code; don't modify app code unless explicitly asked.

## Architecture

- `server.js` — builds the Express app, mounts `express.json()` and each router under its path (`/users`, `/health`), and exports `app`. It only calls `app.listen` when run directly (`require.main === module`), which is what lets tests import it.
- `routes/` — one file per resource, each exporting an `express.Router()`. A new resource = new file here + a `app.use(...)` line in `server.js`.
- `db/store.js` — in-memory stand-in for a database. State is module-level and resets on restart; within one test process it is shared, so a `POST /users` in one test is visible to later tests.
