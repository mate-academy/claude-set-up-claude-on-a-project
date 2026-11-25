# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

A small Express REST API (users + health check) used as the starter project for the Claude Code course.

## Commands

- `npm run dev`: start the API on http://localhost:3000 with `node --watch` (set `PORT` to change it)
- `npm test`: run all tests with the built-in Node test runner (`node --test`)
- `node --test tests/users.test.js`: run one test file
- `node --test --test-name-pattern="404" tests/users.test.js`: run tests whose name matches the pattern
- `npm run lint`: ESLint (`eslint:recommended`)

CI (`.github/workflows/ci.yml`) runs `npm run lint` and then `npm test` on Node 22. Both must pass.

## Conventions

- Use CommonJS (`require` / `module.exports`), not ES modules. ESLint is set to `sourceType: "script"`.
- Write tests with `node:test` + `node:assert` + `supertest`, not Jest or Mocha. Import `app` from `../server` and never call `listen()` in tests.
- Route handlers access data only through functions exported from `db/store.js`. Never edit the `users` array directly from a route.
- Errors are returned as JSON `{ "error": "<message>" }` with the right status code (400 for bad input, 404 for not found). Successful creates return 201.
- Convert route params to numbers (`Number(req.params.id)`) before looking them up. Store IDs are numbers.
- Don't read or commit `.env`. Use `.env.example` for config keys.

## Architecture

- `server.js`: builds the Express app, mounts each router under its path (`/users`, `/health`), and exports `app`. It only calls `listen()` when run directly (`require.main === module`), so tests can import it without opening a port.
- `routes/`: one file per resource, each exporting an `express.Router()`. A new resource means a new file here plus an `app.use(...)` line in `server.js`.
- `db/store.js`: in-memory data store standing in for a database. Data resets on every restart, and state is shared across tests in the same process.
- `tests/`: picked up automatically by `node --test`.
