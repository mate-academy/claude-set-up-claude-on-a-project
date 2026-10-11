# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

Starter Express API (users + health endpoints) used as a practice project for the Claude Code course. CommonJS, Node 22, no database.

## Commands

- `npm run dev` — start the API with `node --watch` on `http://localhost:3000` (`PORT` env var overrides)
- `npm test` — run all tests with the built-in `node --test` runner
- `node --test tests/users.test.js` — run a single test file (add `--test-name-pattern="<name>"` for one test)
- `npm run lint` — ESLint (`.eslintrc.json`); CI runs lint then test on every push/PR

## Architecture

- `server.js` builds the Express `app`, mounts routers (`/users`, `/health`), and exports `app`. It only calls `listen` when run directly (`require.main === module`), so tests import `app` via supertest without opening a port. Keep that guard.
- `routes/` — one router file per resource, mounted by path in `server.js`. New resources need a new file plus a `app.use(...)` line there.
- `db/store.js` — in-memory data layer (module-level arrays, auto-increment id). Data resets on restart. Routes access data only through its exported functions.

## Conventions

- Use CommonJS (`require` / `module.exports`), not ES modules.
- Routes must go through `db/store.js`; never touch the data arrays directly from route files.
- Tests use `node:test` + `node:assert` + `supertest` (not Jest/Mocha); put them in `tests/`.
- Error responses are JSON shaped `{ error: "message" }` with the appropriate status (400 validation, 404 missing).
- Configuration comes from env vars; copy `.env.example` to `.env` (git-ignored). Never read or commit `.env`.
