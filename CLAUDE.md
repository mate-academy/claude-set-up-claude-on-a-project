# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

A minimal Express REST API (users + health check) backed by an in-memory store, used as a course starter project.

## Commands

- `npm run dev` — start the API on http://localhost:3000 (auto-restarts via `node --watch`)
- `npm test` — run the test suite (Node's built-in test runner + supertest)
- `npm test -- --test-name-pattern="<name>"` — run a single test by name
- `npm run lint` — check code style with ESLint

## Conventions

- One route file per resource in `routes/` (e.g. `users.js`, `health.js`), mounted in `server.js`.
- All data access goes through `db/store.js` — routes never manipulate the `users` array directly.
- Unused function args are allowed only for `_`, `req`, `res`, `next` (see `.eslintrc.json`); everything else must be used.

## Architecture

- `server.js` is the entry point: builds the Express app, mounts routers, and only calls `app.listen` when run directly (`require.main === module`), so `tests/*.test.js` can `require("../server")` and hit routes via supertest without opening a real port.
- `db/store.js` is a non-persistent in-memory data layer (resets on every restart) — it stands in for a real database.
- No `.env` is loaded by the app itself; `PORT` is read from `process.env` with a default of 3000.
