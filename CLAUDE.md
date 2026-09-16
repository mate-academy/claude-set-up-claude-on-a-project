# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

A small Express API (users + health endpoints) backed by an in-memory store.

## Commands

- `npm run dev` — start the API on http://localhost:3000 with auto-reload
- `npm test` — run all tests (Node's built-in test runner)
- `node --test tests/users.test.js` — run a single test file
- `npm run lint` — check code style with ESLint

## Conventions

- Use `require`/`module.exports` (CommonJS), not ES modules — see `parserOptions.sourceType: "script"` in `.eslintrc.json`.
- One route file per resource in `routes/`, mounted in `server.js` (e.g. `routes/users.js` → `/users`).
- Route handlers validate input and return JSON error bodies (`{ error: "..." }`) with the appropriate status code (400, 404) rather than throwing.

## Architecture

- `server.js` is the entry point: builds the Express app, mounts routers, and only calls `app.listen` when run directly (`require.main === module`), so tests can `require("../server")` and exercise the app with supertest without opening a real port.
- All data access goes through `db/store.js`, a tiny in-memory store (data resets on restart). Routes never manipulate the users array directly.
