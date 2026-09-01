# CLAUDE.md

Starter Express API used for the Claude Code course — a small REST API that exists so the course can practice configuring Claude Code (CLAUDE.md, permissions) on a real codebase. The app code itself is not meant to change.

## Commands

- `npm run dev` — start the API with auto-reload (`node --watch server.js`)
- `npm test` — run tests (Node's built-in `node:test` + `supertest`, not Jest/Mocha)
- `npm run lint` — check code style with ESLint

## Conventions

- ESLint's `no-unused-vars` is relaxed for `req`, `res`, `next`, and `_` — don't "fix" unused Express handler params.
- `server.js` exports the Express `app` without calling `.listen()` unless the file is run directly, so tests can import `app` without opening a port. Keep this pattern when adding entry points.

## Architecture

- `server.js` — entry point; mounts routers and starts the server.
- `routes/` — one file per resource (`users.js`, `health.js`).
- `db/store.js` — in-memory data access layer; no real database, resets on restart.
