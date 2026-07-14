# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

A minimal Express API (course starter) with an in-memory data store, used to practice setting up Claude Code on a real project.

## Commands

- `npm install` — install dependencies
- `npm run dev` — start the API with auto-reload on http://localhost:3000
- `npm start` — start the API without auto-reload
- `npm test` — run all tests (Node's built-in test runner + supertest)
- `npm test -- --test-name-pattern="GET /health"` — run a single test by name
- `npm run lint` — check code style with ESLint

## Architecture

- `server.js` — entry point; builds the Express app and mounts routers. Only calls `app.listen` when run directly (`require.main === module`), so `tests/` can `require("../server")` and exercise the app without opening a port.
- `routes/` — one router file per resource (`users.js`, `health.js`), mounted in `server.js` under their resource path (`/users`, `/health`).
- `db/store.js` — in-memory data access layer; all reads/writes to data go through here, never through direct array manipulation in routes. Data resets on every server restart.
- `tests/` — one test file per resource, using Node's built-in `test`/`assert` with `supertest` for HTTP assertions against the exported `app`.

## Conventions

- Route handlers validate input and return JSON error bodies (`{ error: "..." }`) with the appropriate status code (400, 404) rather than throwing.
- New resources follow the existing pattern: add a router in `routes/`, mount it in `server.js`, back it with functions in `db/store.js`.
