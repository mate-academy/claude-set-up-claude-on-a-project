# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

A small Express REST API (users and a health check) backed by an in-memory store. It's the starter project for a Claude Code course.

## Commands

- `npm run dev`: start the API with auto-reload on http://localhost:3000 (`PORT` overrides the port)
- `npm test`: run all tests with Node's built-in runner (`node --test`)
- `node --test tests/users.test.js`: run one test file
- `node --test --test-name-pattern="404"`: run tests whose name matches a pattern
- `npm run lint`: ESLint (`eslint:recommended`)

CI (`.github/workflows/ci.yml`) runs `npm install`, `npm run lint` and `npm test` on Node 22. Both lint and tests must pass.

## Architecture

- `server.js` builds the Express app, mounts each router under its path prefix and exports `app`. It only calls `listen()` when run directly (`require.main === module`), so tests import `app` without opening a port. Keep that guard.
- `routes/`: one file per resource, each exporting an `express.Router()`. A new resource needs a new file here plus an `app.use("/<resource>", ...)` line in `server.js`.
- `db/store.js`: the only data-access layer. Routes call its functions and never hold data themselves. It lives in memory, so data resets on every restart and is shared across tests in the same process.

## Conventions

- Return errors as JSON `{ error: "<message>" }` with the right status (400 for invalid input, 404 for not found), and use `return res.status(...)` so the handler stops there. Successful creates return 201.
- Use CommonJS (`require` / `module.exports`), not ES modules. ESLint is set to `sourceType: "script"`.
- Use double quotes and semicolons, matching the existing files.
- Route params arrive as strings. Convert IDs with `Number(req.params.id)` before calling the store, because store lookups use strict `===`.
- Write tests with `node:test` + `node:assert` + `supertest` against the exported `app`, in `tests/*.test.js`. Don't add Jest or Mocha.
- Unused `req`, `res`, `next` and `_` arguments are allowed by the lint config. Keep the standard Express handler signatures.
- Configuration comes from environment variables (see `.env.example`). Never read or commit `.env`.
