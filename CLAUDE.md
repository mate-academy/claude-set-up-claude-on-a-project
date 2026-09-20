# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

Starter Express API (users + health endpoints) used as the base project for the Claude Code course. The README task is to add Claude config (`CLAUDE.md`, `.claude/settings.json`, `NOTES.md`), not to change app code.

## Commands

- `npm run dev` — start the API with `node --watch` on http://localhost:3000 (`PORT` env var overrides)
- `npm test` — run all tests (Node's built-in runner, `node --test`)
- `node --test tests/users.test.js` — run a single test file; add `--test-name-pattern="<name>"` to run one test
- `npm run lint` — ESLint (`eslint:recommended`)

CI (`.github/workflows/ci.yml`) runs `npm run lint` then `npm test` on Node 22 for every push and PR, so both must pass.

## Architecture

- `server.js` builds the Express app, mounts `routes/users.js` at `/users` and `routes/health.js` at `/health`, and exports `app`. It only calls `listen()` when run directly (`require.main === module`), so tests import `app` without opening a port.
- One router file per resource in `routes/`; routers handle validation and HTTP status codes, and reach data only through `db/store.js`.
- `db/store.js` is an in-memory array standing in for a database. Data resets on restart, so nothing is persisted.
- Tests use `node:test` + `node:assert` with `supertest` against the exported `app`.

## Conventions

- CommonJS (`require` / `module.exports`), not ES modules. ESLint is configured with `sourceType: "script"`.
- Use Node's built-in test runner (`node:test`), not Jest or Mocha.
- Routes never touch the data array directly; add store functions in `db/store.js` and call them from the route.
- Error responses are JSON shaped `{ error: "message" }` with the proper status (400 validation, 404 not found).
- Unused args must be named `_`, `req`, `res` or `next` to satisfy the lint rule.
- Secrets go in `.env` (git-ignored); only add sample keys to `.env.example`.
