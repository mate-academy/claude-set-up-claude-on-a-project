# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

A minimal Express REST API for managing users, backed by an in-memory store (no database).

## Commands

- `npm run dev` — start the API on http://localhost:3000 with auto-restart on changes
- `npm test` — run all tests (Node's built-in test runner + supertest)
- `node --test tests/users.test.js` — run a single test file
- `npm run lint` — check code style with ESLint

CI (`.github/workflows/ci.yml`) runs `npm install`, `npm run lint`, and `npm test` on every push and PR.

## Architecture

- `server.js` — entry point; builds the Express app and mounts routes. Exports `app` without calling `.listen()` when required (e.g. from tests), and only starts a real server when run directly.
- `routes/` — one file per resource (`users.js`, `health.js`), mounted in `server.js` under its path prefix (`/users`, `/health`).
- `db/store.js` — in-memory data access layer; all reads/writes to user data go through this module, not directly through route handlers. Data resets on every server restart.

## Conventions

- Route handlers call into `db/store.js` for data access rather than manipulating data directly.
- Validate request bodies in the route handler and return `400` with `{ error: "..." }` for missing/invalid fields, `404` with `{ error: "..." }` for missing resources — see `routes/users.js` for the pattern.
- Tests live in `tests/`, one file per resource, and exercise routes through `supertest` against the exported `app` (not a live server).
