# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

A minimal Express API (course starter project). Endpoints are `/health` and `/users`, backed by an in-memory store.

## Commands

- `npm run dev` — start the API on http://localhost:3000 with auto-restart (`node --watch`)
- `npm start` — start the API without watch mode
- `npm test` — run all tests (Node's built-in test runner)
- `node --test tests/users.test.js` — run a single test file
- `npm run lint` — run ESLint

## Architecture

- `server.js` — app entry point; mounts routers and only calls `app.listen` when run directly (`require.main === module`), so `tests/` can import `app` from `server.js` and drive it with supertest without opening a real port.
- `routes/` — one file per resource (`users.js`, `health.js`), each exporting an Express `Router`.
- `db/store.js` — in-memory data access module; all reads/writes to `users` go through here. Data resets on every server restart — there is no real persistence.
- `tests/` — one test file per resource, using Node's built-in `node:test` + `node:assert` with `supertest` against the exported `app`.

## Conventions

- Route handlers validate input and return JSON error bodies (`{ error: "..." }`) with the appropriate status code (400, 404) rather than throwing.
- Data access is never inlined in route handlers — add new store functions to `db/store.js` instead.
- Config comes from `.env` (git-ignored); `.env.example` documents the expected keys. Never commit real secrets.
