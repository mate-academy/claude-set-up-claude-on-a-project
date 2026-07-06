# CLAUDE.md

This file provides guidance to Claude Code when working in this repository.

## What this is

A small Express API (starter project for the Claude Code course) with in-memory user storage — no real database, no auth.

## Commands

- `npm run dev` — start the API on http://localhost:3000 with auto-reload
- `npm test` — run the `node:test` suite in `tests/`
- `npm run lint` — run ESLint over the project

## Conventions

- One route file per resource in `routes/` (e.g. `users.js`, `health.js`) — don't put multiple resources in one file.
- All data access goes through `db/store.js`, never manipulate the in-memory `users` array directly from a route.
- Validate required fields in the route handler and return `400` with `{ error: "..." }` on failure, `404` with the same shape when a resource isn't found — match the existing error response shape.

## Architecture

- `server.js` is the entry point: builds the Express app, mounts `routes/users.js` at `/users` and `routes/health.js` at `/health`, and only calls `app.listen` when run directly (so tests can `require` the app without opening a port).
- `db/store.js` is a tiny in-memory data helper (arrays, no persistence — resets on restart).
- `tests/` holds `supertest`-based tests against the exported `app`.
