# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

A minimal Express API (in-memory data, no database) used as a teaching project for the Claude Code course — the app itself is not meant to be extended, only used as a real codebase to configure Claude Code against.

## Commands

- `npm run dev` — start the API on http://localhost:3000 with auto-reload (`node --watch`)
- `npm test` — run all tests (Node's built-in test runner)
- `node --test tests/users.test.js` — run a single test file
- `node --test --test-name-pattern="404"` — run tests matching a name
- `npm run lint` — check code style with ESLint

CI (`.github/workflows/ci.yml`) runs `npm install`, `npm run lint`, and `npm test` on every push/PR.

## Conventions

- One route file per resource in `routes/`, mounted in `server.js` (e.g. `routes/users.js` → `/users`).
- All data access goes through `db/store.js`, never inline in route handlers.
- Error responses are `{ error: "message" }` with the appropriate status code (400 for bad input, 404 for missing resources).

## Architecture

`server.js` builds the Express app and exports it; it only calls `app.listen` when run directly (`require.main === module`), so `tests/*.test.js` can `require("../server")` and drive it in-process with `supertest`, without a real port. `db/store.js` is a single in-memory array standing in for a database — data resets on every restart.
