# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

A minimal Express API (starter project for the Claude Code course).

## Commands

- `npm run dev` — start the API on http://localhost:3000 with auto-reload (`node --watch`)
- `npm start` — start the API without auto-reload
- `npm test` — run all tests (Node's built-in test runner + supertest)
- `npm test -- --test-name-pattern="<name>"` — run a single test by name
- `npm run lint` — check code style with ESLint

## Conventions

- One route file per resource in `routes/`, mounted in `server.js` (e.g. `routes/users.js` → `/users`).
- All data access goes through `db/store.js`, not direct manipulation of in-memory data from routes.
- `server.js` exports `app` and only calls `app.listen` when run directly (`require.main === module`), so tests import `app` without opening a real port.

## Architecture

- `server.js` — entry point; wires up middleware and mounts routers.
- `routes/` — one Express router per resource.
- `db/store.js` — in-memory data store standing in for a real database; data resets on restart.
- `tests/` — supertest-based tests against the exported `app`.
