# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

A small Express API (course starter for the Claude Code training). Two resources, `/health` and `/users`, backed by an in-memory store. This is scaffolding for a course exercise: the task is to set up Claude Code's configuration (`CLAUDE.md`, `.claude/settings.json`) on this project, not to change the app code.

## Commands

- `npm run dev` — start the API with auto-reload on `http://localhost:3000`
- `npm start` — start the API without auto-reload
- `npm test` — run all tests (Node's built-in test runner, via `node --test`)
- `npm run lint` — run ESLint over the project

To run a single test file: `node --test tests/users.test.js`

## Architecture

- `server.js` is the entry point: builds the Express app, mounts routers, and starts listening. It only calls `app.listen` when run directly (`require.main === module`), so `tests/` can `require("../server")` and drive the app with supertest against an unbound instance.
- `routes/` has one router file per resource (`users.js`, `health.js`), mounted in `server.js` under `/users` and `/health`.
- `db/store.js` is the only data access point. It holds an in-memory array and resets on every restart; there is no real database. Routes call its exported functions (`getAllUsers`, `getUserById`, `createUser`) rather than touching the array directly.
- Tests live in `tests/` and hit the app through `supertest`, not through a running server.

## Conventions

- Validate required fields in the route handler and return `400` with `{ error: "..." }` before touching the store (see `routes/users.js`).
- Missing resources return `404` with `{ error: "..." }`, not an empty body.
