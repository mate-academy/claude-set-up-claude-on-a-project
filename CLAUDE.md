# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

Minimal Express API starter (users + health endpoints) with an in-memory data store, used as a base project for the Claude Code course.

## Commands

- `npm run dev` — start the API with auto-reload (http://localhost:3000)
- `npm test` — run tests (`node --test`)
- `npm run lint` — check code style with ESLint

## Conventions

- Use `require`/`module.exports` (CommonJS), not ES modules — matches `"sourceType": "script"` in `.eslintrc.json`.
- One route file per resource in `routes/`, mounted in `server.js` (e.g. `routes/users.js` → `/users`).
- All data access goes through `db/store.js` — don't query or mutate the in-memory `users` array directly from route handlers.

## Architecture

- `server.js` — entry point; creates the Express app, mounts routes, starts the server only when run directly (so `tests/` can import `app` without opening a port).
- `routes/` — one file per resource (`users.js`, `health.js`).
- `db/store.js` — in-memory data store; resets on every restart, stands in for a real database.
- `tests/` — uses Node's built-in test runner (`node:test`) with `supertest` for HTTP assertions.
