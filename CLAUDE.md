# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

A small Express REST API used as the starter project for the Claude Code course. Manages an in-memory list of users.

## Commands

- `npm run dev` — start the API with auto-reload on http://localhost:3000
- `npm test` — run the full test suite (Node's built-in test runner)
- `npm run lint` — check code style with ESLint
- Run a single test file: `node --test tests/users.test.js`
- Run tests matching a name: `node --test --test-name-pattern "returns 404"`

## Conventions

- Use CommonJS (`require` / `module.exports`), not ES module `import`. ESLint is configured with `sourceType: "script"`, so `import` syntax will fail.
- Add one route file per resource under `routes/`, then mount it in `server.js` with `app.use("/resource", ...)`. Do not define routes directly in `server.js`.
- Access data only through `db/store.js`; route handlers must not hold their own state.
- Validate request input in the handler and return `400` for missing fields, `404` for a missing record (see `routes/users.js` for the pattern).

## Architecture

- `server.js` is the entry point. It builds the Express `app`, mounts the route modules, and **exports `app`**. It only calls `app.listen()` when run directly (`require.main === module`) — this lets tests import `app` without opening a real port. Preserve this guard.
- `routes/` holds one Express `Router` per resource (`users.js`, `health.js`), each exporting the router.
- `db/store.js` is a tiny in-memory store standing in for a real database. State lives in module-level variables and **resets on every restart** — data is not persisted.
- Tests (`tests/`) use Node's built-in `node:test` plus `supertest`, importing `app` from `server.js` directly (no running server needed). There is no separate test framework.
- CI (`.github/workflows/ci.yml`) runs `npm run lint` then `npm test` on Node 22 for every push and pull request.
