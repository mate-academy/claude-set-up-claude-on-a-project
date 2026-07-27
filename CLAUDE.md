# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

- `npm install` — install dependencies
- `npm run dev` — start the API on http://localhost:3000 with `node --watch` (auto-restarts on file changes)
- `npm test` — run all tests (Node's built-in test runner, `node --test`)
- `npm test -- --test-name-pattern="POST /users"` — run a single test by name
- `npm run lint` — check code style with ESLint

## Architecture

- `server.js` — Express entry point. Mounts `routes/users.js` at `/users` and `routes/health.js` at `/health`. Exports `app` without calling `.listen()` when required as a module (guarded by `require.main === module`), so tests can import it directly via `supertest` without opening a real port.
- `routes/` — one router file per resource (`users.js`, `health.js`). Routes handle HTTP concerns (params, status codes, validation) and delegate data access to `db/store.js`.
- `db/store.js` — in-memory data store standing in for a real database. State is module-level (plain arrays/variables) and resets on every server restart — there is no persistence layer.
- `tests/` — integration-style tests that spin up `app` in-memory via `supertest` and hit real routes, rather than unit-testing handlers in isolation.

## Conventions

- Routes validate input and return `400`/`404` JSON error bodies (`{ error: "..." }`) directly in the handler; there's no shared error-handling middleware.
- `.env` is git-ignored; use `.env.example` as the template for local config.
