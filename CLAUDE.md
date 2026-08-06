# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

- `npm run dev` — start the API with auto-reload (http://localhost:3000)
- `npm start` — start the API without auto-reload
- `npm test` — run all tests (Node's built-in test runner)
- `node --test tests/users.test.js` — run a single test file
- `npm run lint` — check code style with ESLint


## Conventions

- Data access goes through `db/store.js` functions (`getAllUsers`, `getUserById`, `createUser`); routes never touch the `users` array directly.
- Route handlers validate input and return JSON error bodies (`{ error: "..." }`) with the appropriate status code (400, 404) rather than throwing.


## Architecture

- `server.js` — Express app entry point; mounts route modules and only calls `app.listen` when run directly (so tests can `require("../server")` without opening a port).
- `routes/` — one file per resource (`users.js`, `health.js`), each exporting an `express.Router()`.
- `db/store.js` — in-memory data access layer; all reads/writes to user data go through here, not directly through route handlers. Data resets on every server restart.
- `tests/` — uses `node:test` + `supertest` against the exported `app`, not a running server.

