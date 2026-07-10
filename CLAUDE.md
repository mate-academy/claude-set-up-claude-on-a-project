# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

A minimal Express API starter used for the Claude Code course. It is the base repo that later course levels build on top of.

## Commands

- `npm install` — install dependencies
- `npm run dev` — start the API with auto-reload on http://localhost:3000
- `npm start` — start the API without auto-reload
- `npm test` — run all tests (Node's built-in test runner + supertest)
- `node --test tests/users.test.js` — run a single test file
- `npm run lint` — check code style with ESLint

CI (`.github/workflows/ci.yml`) runs `npm install`, `npm run lint`, and `npm test` on every push and PR.

## Architecture

- `server.js` — entry point; wires up middleware and mounts routers. Exports the `app` (without listening) so tests can import it via supertest; only calls `app.listen` when run directly.
- `routes/` — one router file per resource (`users.js`, `health.js`), mounted in `server.js` under its path prefix (`/users`, `/health`).
- `db/store.js` — in-memory data store standing in for a real database. State resets on every restart; not persisted.
- `tests/` — one test file per resource, using Node's `node:test` + `supertest` against the exported `app`.

## Conventions

- Route handlers stay thin: validate input, call into `db/store.js`, respond. No business logic embedded directly in `routes/`.
- Real secrets go in a git-ignored `.env` (see `.env.example` for the shape); never read or commit `.env`.
