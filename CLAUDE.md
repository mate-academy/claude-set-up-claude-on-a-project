# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

Starter Express REST API (course exercise) with an in-memory user store — no database, no auth, no frontend.

## Commands

- `npm install` — install dependencies
- `npm run dev` — start the API with auto-reload on http://localhost:3000
- `npm start` — start the API without auto-reload
- `npm test` — run tests (Node's built-in `node:test` runner + supertest)
- `npm test -- --test-name-pattern="<name>"` — run a single test by name
- `npm run lint` — run ESLint

## Architecture

- `server.js` — entry point; builds the Express app, mounts `express.json()` and the routers, and only calls `app.listen()` when run directly (`require.main === module`) so tests can import `app` without binding a port.
- `routes/` — one router file per resource (`users.js`, `health.js`), mounted in `server.js`.
- `db/store.js` — in-memory data access layer; all reads/writes to user data go through its exported functions (`getAllUsers`, `getUserById`, `createUser`). Data resets on every restart.
- `tests/` — mirrors `routes/`, one test file per resource; tests hit the exported `app` via `supertest` rather than a running server.

## Conventions

- Route handlers validate input and return JSON error bodies (`{ error: "..." }`) with the appropriate status code (400 for bad input, 404 for missing resources) rather than throwing.
- Data access is never inlined in route handlers — it goes through `db/store.js`.
- `PORT` is the only environment variable the app reads (default 3000); see `.env.example`.
