# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

A small Express REST API (users + health check) backed by an in-memory store, used as the starter project for the Claude Code course.

## Commands

- `npm run dev`: start the API with `node --watch` on http://localhost:3000 (override with `PORT`)
- `npm test`: run all tests with the built-in Node test runner (`node --test`)
- `node --test --test-name-pattern="404" tests/users.test.js`: run a single test by name
- `npm run lint`: ESLint (`eslint:recommended`, ESLint 8 with `.eslintrc.json`)


## Conventions

- Use `require`/`module.exports`, not `import`/`export`.
- Write tests with `node:test` + `node:assert` + `supertest` against the exported `app`. Don't add Jest or Mocha.
- Routes never touch data directly. They go through functions exported from `db/store.js`; add new data functions there.
- Error responses are JSON shaped `{ error: "<message>" }` with the right status (400 for validation, 404 for missing). Successful creates return 201.
- Route params arrive as strings. Convert them (`Number(req.params.id)`) before store lookups, which compare with `===`.
- Give each route handler a one-line comment of the form `// METHOD /path — what it does`.

## Architecture

- `server.js` builds the Express app, mounts each router under its path, and exports `app`. It only calls `listen()` when run directly (`require.main === module`), so tests import `app` without opening a port. Keep that guard.
- `routes/`: one `express.Router()` file per resource, mounted in `server.js` (`/users`, `/health`). A new resource means a new file here plus an `app.use(...)` line in `server.js`.
- `db/store.js`: module-level in-memory arrays that reset when the process restarts. State is shared across tests in the same process, so tests should not assume exact counts or IDs.
- Config comes from env vars (see `.env.example`). Real values go in `.env`, which must never be read or committed.
