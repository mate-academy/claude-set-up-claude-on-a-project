# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

Starter Express API for the Claude Code course projects — an in-memory `/users` and `/health` API used as a real codebase to practice setting up Claude Code on.

## Commands

- `npm run dev` — start the API with auto-reload (http://localhost:3000)
- `npm test` — run the test suite (Node's built-in test runner + supertest)
- `npm run lint` — run ESLint
- `node --test tests/users.test.js` — run a single test file

## Conventions

- CommonJS (`require`/`module.exports`), not ESM — matches `"sourceType": "script"` in `.eslintrc.json`.
- One route file per resource under `routes/`, mounted in `server.js` (e.g. `routes/users.js` → `/users`).
- Route handlers call into `db/store.js` for data access; they don't manipulate the `users` array directly.
- `server.js` exports the `app` without calling `.listen()` when required (not run directly), so tests can import it via supertest without opening a real port.

## Architecture

- `server.js` — entry point; wires up middleware and mounts route modules.
- `routes/` — one Express router per resource (`users.js`, `health.js`).
- `db/store.js` — in-memory data store standing in for a real database; state resets on every restart.
- `tests/` — integration tests hitting the Express app in-process via `supertest`.
