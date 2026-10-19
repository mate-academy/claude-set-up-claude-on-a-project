# CLAUDE.md

Starter Express API (Node.js, CommonJS) with `/users` and `/health` endpoints, backed by an in-memory store.

## Commands

- `npm run dev` — start the API with auto-reload on http://localhost:3000
- `npm test` — run tests (`node --test` + supertest)
- `npm run lint` — ESLint (`eslint:recommended`); run it and `npm test` before committing

## Conventions

- Use CommonJS (`require` / `module.exports`), not ES modules — ESLint is configured with `sourceType: "script"`.
- One router file per resource in `routes/`, mounted in `server.js`.
- Routes never touch data directly; go through functions in `db/store.js`.
- Respond with JSON everywhere; errors are `{ "error": "<message>" }` with the right status (400 validation, 404 missing).
- Add a test in `tests/` for every new route, using supertest against the exported `app`.
- Unused handler args must be named `req`, `res`, `next`, or prefixed `_` (lint rule).

## Architecture

- `server.js` — builds the Express app, mounts routers, and exports `app`. It only calls `listen` when run directly, so tests import `app` without opening a port.
- `routes/` — `users.js` and `health.js`.
- `db/store.js` — in-memory data; resets on restart. Swapping in a real database should only touch this file.
- Config comes from env vars (see `.env.example`); never read or commit `.env`.
