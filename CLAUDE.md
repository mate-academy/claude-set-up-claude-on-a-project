# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

A minimal Express API (users + health endpoints) backed by an in-memory store. It's the starter project for a Claude Code course — this repo is not meant to grow app features; it's the object of exercises in setting up `CLAUDE.md` and permission rules.

## Commands

- `npm install` — install dependencies
- `npm run dev` — start the API on http://localhost:3000 with auto-restart (`node --watch`)
- `npm start` — start the API without watch mode
- `npm test` — run all tests (Node's built-in test runner, via `node --test`)
- `npm test -- --test-name-pattern="<name>"` — run a single test by name
- `npm run lint` — run ESLint

## Architecture

- `server.js` — Express app entry point; mounts route modules and only calls `app.listen` when run directly (`require.main === module`), so `tests/` can `require("../server")` and drive it with supertest against an unbound app.
- `routes/` — one file per resource (`users.js`, `health.js`), each exporting an `express.Router()`.
- `db/store.js` — the only data-access layer; an in-memory array that resets on every restart. Routes call into it rather than touching data directly.
- `tests/` — supertest-based HTTP tests against the exported `app`, run with `node:test`/`node:assert`.

## Conventions

- Add a new resource by creating `routes/<resource>.js` exporting a router, then mounting it in `server.js` — follow the existing `users.js` shape (router per file, data access delegated to `db/store.js`).
- Validate required fields in the route handler and return `400` with `{ error: "..." }` on failure, `404` with `{ error: "..." }` when a lookup misses (see `routes/users.js`).
