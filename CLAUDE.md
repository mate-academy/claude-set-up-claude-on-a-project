# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

A small Express REST API (users + health check) backed by an in-memory store; used as the starter project for a Claude Code course.

## Commands

- `npm run dev` — start the API with `node --watch` on http://localhost:3000 (`PORT` overrides)
- `node --test --test-name-pattern="404" tests/users.test.js` — run a single test by name
- `npm run lint` — ESLint (`eslint:recommended`); CI runs lint then tests on Node 22

## Conventions

- Use CommonJS (`require` / `module.exports`), not ES modules — ESLint is configured with `sourceType: "script"`.
- Use Node's built-in `node:test` and `node:assert` plus `supertest` for tests, not Jest or Mocha. Put tests in `tests/` as `*.test.js`.
- Route handlers never touch data directly — go through functions exported from `db/store.js`.
- Error responses are JSON shaped `{ error: "<message>" }` with the matching status (400 for validation, 404 for missing).
- Do not read or commit `.env`; add new config keys to `.env.example` instead.
- Confirm pushing to master branch to prevent non pull request from happening on master.

## Architecture

- `server.js` builds the Express app, mounts each router under its path (`/users`, `/health`), and exports `app`. It only calls `listen()` when run directly (`require.main === module`), so tests import `app` and hit it via supertest without opening a port.
- `routes/` holds one `express.Router()` file per resource; adding a resource means a new file here plus an `app.use(...)` line in `server.js`.
- `db/store.js` is an in-memory array standing in for a database — data resets on restart and state is shared across tests in the same process.
