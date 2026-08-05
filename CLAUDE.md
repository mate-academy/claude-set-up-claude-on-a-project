# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

A minimal Express REST API (starter project for the Claude Code course) exposing `/health` and `/users` endpoints, backed by an in-memory store.

## Commands

- `npm run dev` — start the API with auto-reload (`node --watch`) on http://localhost:3000
- `npm test` — run the test suite (Node's built-in test runner + supertest)
- `npm test -- --test-name-pattern="<name>"` — run a single test by name
- `npm run lint` — check code style with ESLint

## Conventions

- One route file per resource in `routes/`, mounted in `server.js` (e.g. `routes/users.js` → `/users`).
- All data access goes through `db/store.js`, not direct manipulation of arrays/objects in route handlers.
- `server.js` exports the `app` instance and only calls `.listen()` when run directly (`require.main === module`), so tests can import `app` without opening a real port.
- Config/secrets go through `.env` (git-ignored), based on `.env.example`; the app only currently reads `PORT`.

## Architecture

- Entry point: `server.js` — creates the Express app, applies `express.json()`, mounts route modules.
- `routes/` — one file per resource (`users.js`, `health.js`); each exports an `express.Router()`.
- `db/store.js` — in-memory data helper (no persistence; resets on restart). This is the only place that touches the `users` array directly.
- `tests/` — integration tests using `supertest` against the exported `app`, no live server needed.

## Constraints

- This is a course exercise repo: the task is to configure Claude Code (`CLAUDE.md`, `.claude/settings.json`) here, not to modify the application code in `server.js`, `routes/`, or `db/`.
