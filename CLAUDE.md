# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

A small Express REST API (starter project for the Claude Code course). In-memory data only — nothing persists across restarts.

## Commands

- `npm run dev` — start the API with auto-reload on http://localhost:3000
- `npm start` — start the API without auto-reload
- `npm test` — run all tests (Node's built-in test runner)
- `node --test tests/users.test.js` — run a single test file
- `npm run lint` — check code style with ESLint

CI (`.github/workflows/ci.yml`) runs `npm install`, `npm run lint`, and `npm test` on every push and PR.

## Architecture

- `server.js` — entry point; wires up middleware and mounts routers. Exports the `app` (without calling `listen`) so tests can import it directly via supertest.
- `routes/` — one router file per resource (`users.js`, `health.js`), mounted in `server.js`.
- `db/store.js` — in-memory data access layer; routes call into this rather than holding state themselves.
- `tests/` — supertest-based route tests, one file per resource, mirroring `routes/`.

## Conventions

- Route handlers validate input and return JSON errors directly (e.g. `{ error: "..." }`) — no shared error-handling middleware exists yet.
- Data access goes through `db/store.js`, not inline arrays in route files.
- Real secrets go in `.env` (git-ignored); `.env.example` documents the shape.
