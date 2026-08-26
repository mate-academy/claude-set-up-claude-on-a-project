# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

A minimal Express API starter used for a Claude Code course. Endpoints are `/health` and `/users`, backed by an in-memory store (no real database).

## Commands

- `npm run dev` — start the API with auto-reload (`node --watch server.js`) on `http://localhost:3000`
- `npm start` — start the API without auto-reload
- `npm test` — run all tests (Node's built-in test runner + supertest)
- `node --test tests/users.test.js` — run a single test file
- `npm run lint` — run ESLint over the project

CI (`.github/workflows/ci.yml`) runs `npm install`, `npm run lint`, and `npm test` on every push and PR.

## Architecture

- `server.js` — app entry point; mounts route modules and only calls `app.listen` when run directly (not when imported by tests), so `tests/` can import `app` without opening a real port.
- `routes/` — one file per resource (`users.js`, `health.js`), each exporting an Express `Router`.
- `db/store.js` — in-memory data access layer; all reads/writes to user data go through this module rather than touching arrays directly in routes. Data resets on every restart.
- `tests/` — integration tests that hit the Express app via `supertest`, not unit tests of individual functions.

## Conventions

- Route handlers validate input and return JSON error bodies (`{ error: "..." }`) with the appropriate status code (400, 404) rather than throwing.
- Data access stays in `db/store.js`; routes call its exported functions (`getAllUsers`, `getUserById`, `createUser`) instead of reading/writing the `users` array directly.
- Usa camelcase para nombrar las variables y los nombres deben ser descriptivos no por defectos.
