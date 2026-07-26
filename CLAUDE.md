# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

A minimal Express API (users + health endpoints) backed by an in-memory store, used as the base project for the Claude Code course.

## Commands

- `npm run dev` — start the API with auto-reload (`node --watch server.js`) on `http://localhost:3000`
- `npm test` — run all tests (Node's built-in test runner)
- `npm run lint` — run ESLint

## Conventions

- One route file per resource in `routes/`, mounted in `server.js` (e.g. `routes/users.js` → `/users`).
- All data access goes through `db/store.js` (an in-memory array); routes never touch data directly.
- `server.js` exports the `app` without calling `listen()` when required as a module (checked via `require.main === module`), so tests can import it directly with `supertest` instead of hitting a real port.
- CI (`.github/workflows/ci.yml`) runs `npm install`, `npm run lint`, and `npm test` on every push/PR — keep both green before pushing.

## Architecture

- `server.js` — entry point; wires up middleware (`express.json()`) and mounts route routers.
- `routes/` — one Express router per resource (`users.js`, `health.js`); handles HTTP concerns (params, status codes, validation) and delegates data operations to `db/store.js`.
- `db/store.js` — in-memory data layer; state resets on every restart (stand-in for a real database).
- `tests/` — integration tests using `supertest` against the exported `app` and Node's built-in `node:test` runner.
