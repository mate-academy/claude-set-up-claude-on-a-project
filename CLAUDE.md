# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

Starter Express API for the Claude Code course. A minimal REST API with `/health` and `/users` endpoints, backed by an in-memory store (no real database).

## Commands

- `npm run dev` — start the API with auto-restart on file changes (`node --watch server.js`), listens on `http://localhost:3000`
- `npm start` — start the API without watch mode
- `npm test` — run all tests (Node's built-in test runner, via `node --test`)
- `npm test -- tests/users.test.js` — run a single test file
- `npm run lint` — run ESLint over the whole project

## Architecture

- `server.js` — app entry point; builds the Express app, mounts routers, and only calls `app.listen` when run directly (`require.main === module`), so `tests/*.test.js` can `require("../server")` and hit the app in-process via `supertest` without opening a real port.
- `routes/` — one router file per resource (`users.js`, `health.js`), mounted in `server.js` under their resource path (`/users`, `/health`).
- `db/store.js` — the only data access layer; routers call into it rather than holding state themselves. Data is plain in-memory arrays and resets on every restart.
- `tests/` — integration-style tests that go through the HTTP layer (`supertest` against the exported `app`), not unit tests of individual functions.

## Conventions

- Add a new resource by creating a router in `routes/`, giving it its own `db/store.js`-style data module if needed, and mounting it in `server.js` — do not put data access logic directly in route handlers beyond calling the store.
- Validation errors return `400` with `{ error: "..." }`; missing resources return `404` with `{ error: "..." }` — match this shape for new endpoints.
- `.env` holds real config/secrets and is git-ignored; `.env.example` documents the shape and must stay free of real values.
