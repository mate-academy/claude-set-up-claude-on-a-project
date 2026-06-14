# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

A small Express REST API used as the working codebase for the Claude Code course.

## Commands

- `npm run dev` — start the API with auto-reload on http://localhost:3000
- `npm test` — run the test suite (`node --test`)
- `npm run lint` — check code style (ESLint)
- Run a single test file: `node --test tests/users.test.js`

## Conventions

- Use CommonJS (`require` / `module.exports`), not ES modules — ESLint is configured for `sourceType: "script"`.
- Use double quotes for strings (matches existing files).
- One route file per resource in `routes/`; all data access goes through `db/store.js`, never touch the in-memory `users` array directly from a route.
- Routes return JSON and set explicit status codes (e.g. 400 for missing fields, 404 for not found).

## Architecture

- `server.js` — entry point. Wires `express.json()` and mounts each router under its base path (`/users`, `/health`). It only calls `app.listen()` when run directly, and exports `app` so tests can import it via supertest without opening a port.
- `routes/` — one Express `Router` per resource. Handlers stay thin and delegate to the store.
- `db/store.js` — a tiny in-memory data helper standing in for a real database. State resets on every restart; this is the single source of truth for user data.
- `tests/` — uses Node's built-in `node:test` runner with `supertest` against the imported `app`.
