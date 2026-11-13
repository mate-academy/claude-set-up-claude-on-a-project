# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

Small Express REST API (users + health check) used as the base project for a Claude Code course; each course project builds on it.

## Commands

- `npm run dev` — start the API on http://localhost:3000 with `node --watch` (port from `PORT`)
- `npm test` — Node's built-in test runner (`node --test`); single file: `node --test tests/users.test.js`
- `npm run lint` — ESLint 8 with `.eslintrc.json`
- CI (`.github/workflows/ci.yml`) runs `npm install` → `npm run lint` → `npm test` on Node 22; run lint and tests before calling work done.

## Architecture

- `server.js` is the entry point: creates the Express app, adds `express.json()`, mounts the routers, and exports `app`. It only calls `listen` when run directly (`require.main === module`).
- `routes/` holds one `express.Router()` file per resource (`users.js`, `health.js`), mounted in `server.js` via `app.use("/<resource>", ...)`. New resources get a new file here.
- `db/store.js` is the only data layer: routes call its exported functions and never hold data themselves. It's an in-memory array (seeded with users 1 and 2) that resets on restart, standing in for a real database.

## Conventions

- CommonJS only (`require` / `module.exports`), not ES modules — ESLint is configured with `sourceType: "script"`.
- Double quotes, semicolons, 2-space indentation.
- Tests use `node:test` + `node:assert` + `supertest` against the `app` exported from `server.js` — don't start a real server in tests (`server.js` only listens when `require.main === module`).
- Errors are returned as JSON `{ error: "<message>" }` with the matching status code (400, 404, …), not just retranslating error object.
- Add one-line comment before every new function with description
