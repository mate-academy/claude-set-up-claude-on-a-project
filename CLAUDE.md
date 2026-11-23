# CLAUDE.md

A small Express REST API (users + health check) backed by an in-memory store, used as the starter project for a Claude Code course.

## Commands

- `npm run dev` — start the API with `node --watch` on http://localhost:3000 (`PORT` overrides)
- `npm test` — run all tests with the built-in Node test 

## Conventions

- Use CommonJS (`require` / `module.exports`), not ES modules — ESLint is configured with `sourceType: "script"`.
- Write tests with `node:test` and `node:assert` plus `supertest`, not Jest or Mocha. Import `app` from `../server` and call `request(app)`; never start a real server in tests.

## Architecture

- `server.js` builds the Express app, applies `express.json()`, mounts each router under its path (`/users`, `/health`), and exports `app`. It only calls `listen()` when run directly (`require.main === module`), which is what lets tests import it.
- `routes/` holds one `express.Router` file per resource. Adding a resource means a new file here plus an `app.use(...)` line in `server.js`.
- `db/store.js` is an in-memory stand-in for a database. State lives at module level, so it resets on restart and is shared by all tests in the same process — a test that creates a user changes what later tests see.
