# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

A minimal Express API (in-memory data, no database) used as a teaching sandbox for the Claude Code course. Course progress is tracked outside the app code — see README.md for the assignment.

## Commands

- `npm run dev` — start the API with auto-reload at http://localhost:3000
- `npm test` — run all tests (Node's built-in test runner + supertest)
- `npm test -- --test-name-pattern="<name>"` — run a single test by name
- `npm run lint` — check code style with ESLint

## Conventions

- Routes are plain Express routers, one file per resource under `routes/`, mounted in `server.js`.
- Data access goes through `db/store.js`, not inline in routes — it's the only module that touches the in-memory `users` array.
- Data does not persist: the store resets on every restart.
- `server.js` exports the `app` (only calls `.listen()` when run directly), so tests import it without opening a real port.

## Architecture

`server.js` wires middleware and mounts routers — `routes/users.js` and `routes/health.js` — nothing else lives at the top level. Each route module is self-contained (own validation, own responses) and calls into `db/store.js` for reads/writes. Tests in `tests/` hit the exported `app` directly via `supertest`, no server process required.
