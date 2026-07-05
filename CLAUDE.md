# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

Starter Express API for the Claude Code course projects — an in-memory `/users` and `/health` API used as a real codebase to practice configuring Claude Code (this task is not about changing the app code).

## Commands

- `npm install` — install dependencies
- `npm run dev` — start the API on http://localhost:3000 with auto-restart (`node --watch`)
- `npm test` — run all tests (Node's built-in test runner + supertest)
- `npm test -- --test-name-pattern="GET /health"` — run a single test by name
- `npm run lint` — check code style with ESLint

CI (`.github/workflows/ci.yml`) runs `npm install`, `npm run lint`, and `npm test` on every push/PR with Node 22.

## Conventions

- Route handlers live one-per-resource under `routes/` (e.g. `users.js`, `health.js`) and are mounted in `server.js` — add new resources the same way rather than growing an existing route file.
- All data access goes through `db/store.js`; route handlers never manipulate the in-memory `users` array directly.
- Real secrets go in a git-ignored `.env` (see `.env.example` for the shape); never commit secrets or edit `.env.example` with real values.
- ESLint's `no-unused-vars` ignores `req`, `res`, `next`, and `_`-prefixed args — no need to reference unused Express handler params.

## Architecture

- `server.js` is the single entry point: builds the Express app, mounts `routes/users.js` at `/users` and `routes/health.js` at `/health`, and only calls `app.listen` when run directly (`require.main === module`) — this lets `tests/users.test.js` import `app` from `server.js` and drive it with supertest without opening a real port.
- `db/store.js` is a tiny in-memory data store (a plain array with a running `nextId`) standing in for a real database; data resets on every server restart.
