# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

A small Express REST API (users + health check) backed by an in-memory store; the starter project for the Claude Code course.

## Commands

- `npm run dev` — start the API with `node --watch` on `http://localhost:3000` (port from `PORT`)
- `npm start` — run the API once, without file watching
- `npm test` — run all tests with Node's built-in runner (`node --test`), which auto-discovers `*.test.js` files — new tests in `tests/` need no config
- `node --test tests/users.test.js` — run one test file; add `--test-name-pattern="404"` to run a single test
- `npm run lint` — ESLint (`eslint:recommended`)

CI (`.github/workflows/ci.yml`, Node 22) runs `npm run lint` then `npm test` on every push and PR — both must pass.

## Conventions

- Use CommonJS (`require` / `module.exports`), not ES modules — ESLint is configured with `sourceType: "script"`.
- Routes read and write data only through the functions exported by `db/store.js`; never import or mutate the store's arrays directly. Note `getAllUsers()` returns the live array, not a copy — don't modify its result. Add a new store function when a route needs new data access.
- Error responses are JSON of the form `{ error: "<message>" }` with the matching status code (400 for invalid input, 404 for missing records). Successful creates return 201.
- Path params arrive as strings — convert IDs with `Number(req.params.id)` before calling the store (store IDs are numbers and compared with `===`).
- Tests use `node:test` + `node:assert` with `supertest` against the exported `app`; do not add Jest/Mocha or start a real server in tests.

## Architecture

- `server.js` builds the Express app, mounts each router under its path (`/users`, `/health`), and exports `app`. It only calls `listen()` when run directly (`require.main === module`), which is what lets tests import it without opening a port.
- `routes/` holds one `express.Router()` file per resource. Adding a resource means creating `routes/<resource>.js` and mounting it in `server.js`.
- `db/store.js` is an in-memory stand-in for a database: data resets on every restart, and state is shared across tests within the same process, so tests shouldn't assume a fixed number of users.
- Config comes from environment variables (see `.env.example`); `.env` is git-ignored and holds real secrets.
