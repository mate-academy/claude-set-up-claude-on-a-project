# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

A minimal Express API used as the starter project for a Claude Code course. It is intentionally small: one route per resource, an in-memory data store, and a handful of tests.

## Commands

- `npm install` — install dependencies
- `npm run dev` — start the API with `node --watch` on http://localhost:3000 (auto-restarts on file changes)
- `npm start` — start the API without watch mode
- `npm test` — run all tests (`node:test` runner)
- `node --test tests/users.test.js` — run a single test file
- `npm run lint` — run ESLint (`eslint:recommended`, flat `no-unused-vars` warning for `_`/`req`/`res`/`next` args)

CI (`.github/workflows/ci.yml`) runs `npm install`, `npm run lint`, and `npm test` on push and PR, on Node 22.

## Architecture

- `server.js` — Express app entry point. Mounts `routes/users.js` at `/users` and `routes/health.js` at `/health`. Exports the `app` instance (rather than starting it) unless run directly, so tests can import it without opening a real port.
- `routes/` — one file per resource, each exporting an `express.Router()`. Route handlers call into `db/store.js` for data instead of touching state directly.
- `db/store.js` — a tiny in-memory data store standing in for a real database. State (`users`, `nextId`) is module-level and resets on every server restart; there is no persistence layer.
- `tests/` — uses `node:test` + `supertest` against the exported `app`, not a running server.

## Conventions

- New resources follow the existing pattern: add a router in `routes/`, mount it in `server.js`, and back it with functions in `db/store.js` (or an equivalent module) rather than reaching into shared state from the route file.
- Config comes from environment variables (see `.env.example`); real secrets go in a git-ignored `.env`, never committed.
