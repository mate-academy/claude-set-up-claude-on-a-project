# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

A starter Express API (course project) with a `/users` and `/health` resource, backed by an in-memory store.

## Commands

- `npm run dev` — start the API with auto-reload on http://localhost:3000
- `npm test` — run the test suite (Node's built-in test runner + Supertest)
- `npm test -- --test-name-pattern="<name>"` — run a single test by name
- `npm run lint` — check code style with ESLint

CI (`.github/workflows/ci.yml`) runs `npm install`, `npm run lint`, and `npm test` on every push and PR.

## Conventions

- Use CommonJS (`require`/`module.exports`), not ES modules — matches `"sourceType": "script"` in `.eslintrc.json`.
- One route file per resource under `routes/`, mounted in `server.js` (e.g. `routes/users.js` → `app.use("/users", ...)`).
- Route handlers call into `db/store.js` for data access; they don't manipulate the in-memory arrays directly.
- Unused function args named `req`, `res`, `next`, or prefixed with `_` are exempt from ESLint's `no-unused-vars`.

## Architecture

- `server.js` is the entry point: builds the Express app, mounts routers, and only calls `app.listen` when run directly (`require.main === module`), so tests can import `app` without opening a real port.
- `db/store.js` is a tiny in-memory data store standing in for a real database — data resets on every restart. It's the only place that touches the `users` array.
- Real secrets belong in a git-ignored `.env` (see `.env.example` for the shape); none are currently used by the app.
