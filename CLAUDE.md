# CLAUDE.md 

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

Starter Express API used for the Claude Code course. It exposes `/health` and `/users` endpoints backed by an in-memory store.

## Commands

- `npm install` — install dependencies
- `npm run dev` — start the API on http://localhost:3000 (auto-restarts via `node --watch`)
- `npm test` — run the test suite (Node's built-in test runner + supertest)
- `npm run lint` — run ESLint

Run a single test file: `node --test tests/users.test.js`

## Architecture

- `server.js` — entry point; builds the Express app and mounts routers. Exports `app` without calling `listen()` when required as a module (guarded by `require.main === module`), so tests can import it directly without opening a real port.
- `routes/` — one router file per resource (`users.js`, `health.js`), mounted in `server.js`.
- `db/store.js` — in-memory data layer; all data access goes through its exported functions. Data resets on every server restart (no persistence).
- `tests/` — one test file per resource, using `supertest` against the exported `app`.

## Conventions

- Data access from routes goes through `db/store.js`, not directly through in-memory arrays.
- Route handlers validate input and return JSON error bodies (`{ error: "..." }`) with the appropriate status code (400 for bad input, 404 for missing resources) rather than throwing.
