# CLAUDE.md

Express REST API (users + health check) backed by an in-memory store; used as the starter project for a Claude Code course.

## Commands

- `npm run dev` — start the API on http://localhost:3000 with `node --watch` (port from `PORT`)
- `npm test` — run all tests with Node's built-in runner (`node --test`)
- `npm run lint` — ESLint (`eslint:recommended`); CI runs lint then tests on Node 22

## Conventions

- Use CommonJS (`require` / `module.exports`), not ES modules — ESLint is configured with `sourceType: "script"`.
- Use Node's `node:test` + `node:assert` with `supertest`, not Jest or Mocha.
- Routes never touch data directly — go through functions exported from `db/store.js`.
- Error responses are JSON `{ error: "<message>" }` with the matching status code (400 for invalid input, 404 for missing resources).
- Double quotes and semicolons, matching existing files.

## Architecture

- `server.js` builds the Express app, mounts one router per resource (`/users`, `/health`), and exports `app`. It only calls `listen()` when run directly (`require.main === module`), so tests import `app` and hit it via supertest without opening a port.
- `routes/` — one file per resource, each exporting an `express.Router()`. Adding a resource means a new route file plus a `app.use(...)` line in `server.js`.
- `db/store.js` — module-level in-memory arrays standing in for a database. Data resets on restart, and state is shared across all tests in a process (a `POST` in one test is visible to later tests).
- `.env` holds real config and is git-ignored; `.env.example` documents the variables.
