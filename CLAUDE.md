# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

A minimal Express API (starter project for the Claude Code course). It exposes `/users` and `/health` endpoints backed by an in-memory store — there is no real database and no persistence between restarts.

## Commands

- `npm install` — install dependencies
- `npm run dev` — start the API on http://localhost:3000 (auto-restarts via `node --watch`)
- `npm start` — start the API without watch mode
- `npm test` — run the test suite (Node's built-in test runner via `node --test`)
- `npm run lint` — run ESLint over the whole project

To run a single test file: `node --test tests/users.test.js`

## Architecture

- `server.js` — entry point; builds the Express app and mounts routers. Only calls `app.listen` when run directly (`require.main === module`), so `tests/` can `require("../server")` and drive it with supertest without opening a real port.
- `routes/` — one router file per resource (e.g. `users.js`, `health.js`), mounted in `server.js` under a path prefix (`/users`, `/health`).
- `db/store.js` — all data access goes through this module's exported functions (`getAllUsers`, `getUserById`, `createUser`). It's an in-memory array standing in for a real database.
- `tests/` — supertest-based integration tests that import the exported `app` and make requests against routes directly.

## Conventions

- Route handlers validate input and return JSON error bodies (`{ error: "..." }`) with the appropriate status code (400, 404) rather than throwing.
- Data access is never inlined in route handlers — add new operations to `db/store.js` and call them from the router.
- Config values (e.g. `PORT`) come from `process.env`, with real secrets meant to live in a git-ignored `.env` (see `.env.example` for the shape).
