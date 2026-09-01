# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

A minimal Express API (users + health endpoints) backed by an in-memory store, used as the starter project for the Claude Code course.

## Commands

- `npm run dev` — start the API on http://localhost:3000 with auto-restart (`node --watch server.js`)
- `npm test` — run all tests (`node --test`, uses supertest against the exported `app`)
- `npm test -- --test-name-pattern="POST /users"` — run a single test by name
- `npm run lint` — run ESLint (`eslint:recommended`, flags unused vars except `_`, `req`, `res`, `next`)

CI (`.github/workflows/ci.yml`) runs `npm install`, `npm run lint`, then `npm test` on every push and PR.

## Architecture

- `server.js` — entry point; mounts route modules and exports `app` without calling `.listen()` when required (not run directly), so tests can import it without opening a real port.
- `routes/` — one file per resource (`users.js`, `health.js`), each exporting an Express `Router`.
- `db/store.js` — in-memory data access layer; all persistence goes through its exported functions (`getAllUsers`, `getUserById`, `createUser`). Data resets on every restart.
- `tests/` — supertest-based route tests using Node's built-in `node:test` runner.

## Conventions

- Route handlers validate input and return JSON error bodies (`{ error: "..." }`) with the appropriate status code (400, 404) rather than throwing.
- Data access always goes through `db/store.js` — route files never manipulate the `users` array directly.
