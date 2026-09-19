# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

Starter Express API for the Claude Code course: a minimal REST API with an in-memory data store.

## Commands

- `npm run dev` — start the API with auto-reload
- `npm test` — run all tests
- `npm test -- --test-name-pattern="GET /users"` — run a single test by name
- `npm run lint` — check code style with ESLint

## Architecture

- `server.js` — entry point; wires up Express and mounts routers.
- `routes/` — one router file per resource (`users.js`, `health.js`).
- `db/store.js` — in-memory data access layer; all reads/writes go through its exported functions.

## Conventions

- Route handlers validate input and return JSON error bodies (`{ error: "..." }`) with the appropriate status code (400, 404) rather than throwing.
