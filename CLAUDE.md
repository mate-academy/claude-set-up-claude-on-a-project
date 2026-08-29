# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project context

A small Express API that manages users, with a health-check endpoint.

## Commands

- `npm install` — install dependencies
- `npm run dev` — start the API with hot-reload on http://localhost:3000
- `npm test` — run the test suite (`node --test`); pass `-- --test-name-pattern="<name>"` to run a single test
- `npm run lint` — run ESLint

## Conventions

- Put each API resource in its own `routes/<resource>.js` module and mount it in `server.js`; do not define resource handlers directly in `server.js`.
- Access application data through `db/store.js`; do not create route-local data stores.
- Keep `app.listen()` behind the `require.main === module` guard so tests can import the Express app without opening a port.
- Write endpoint tests with `node:test` and `supertest` under `tests/`.

## Architecture

- `server.js` — entry point; creates the Express app and mounts each resource router.
- `routes/` — one router module per resource (e.g. `users.js`, `health.js`).
- `db/store.js` — single in-memory data store shared by all routes; no persistence.
- `tests/` — endpoint tests that exercise the exported app in-process via `supertest`.
