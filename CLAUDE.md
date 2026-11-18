# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

A small Express (Node 22) REST API for users, used as the starter project for a Claude Code course.

## Commands

- `npm run dev`: start the API with auto-reload on http://localhost:3000 (`PORT` env var overrides)
- `npm test`: run all tests (Node's built-in runner, `node --test`)
- `node --test tests/users.test.js`: run one test file
- `node --test --test-name-pattern="404" tests/`: run tests whose name matches
- `npm run lint`: ESLint (`eslint:recommended`)

CI (`.github/workflows/ci.yml`) runs `npm run lint` and then `npm test` on every push and PR, so both must pass.

## Conventions

- Use CommonJS (`require` / `module.exports`), not ESM `import`. ESLint parses files as `sourceType: "script"`.
- Write tests with `node:test` + `node:assert` + `supertest` against the exported `app`, not Jest/Mocha, and don't start a real server in tests.
- Route handlers read and write data only through `db/store.js` functions, never with their own arrays or state.
- Send error responses as `res.status(<code>).json({ error: "<message>" })`, and `return` early on validation failures.
- Validate request bodies in the route (e.g. `POST /users` requires `name` and `email`, else 400).

## Architecture

- `server.js` builds the Express app, mounts each router under its path (`/users`, `/health`), and exports `app`. It only calls `listen()` when run directly (`require.main === module`), which lets tests import it.
- `routes/`: one file per resource, each exporting an `express.Router()`. To add a resource, create `routes/<name>.js` and mount it in `server.js`.
- `db/store.js`: in-memory data layer standing in for a database. It is module-level state, so data resets on restart, and it is **shared across all tests in a process**. Tests that create users change what later tests see.
- Config comes from env vars (see `.env.example`). `.env` is git-ignored and must not be read or committed.
