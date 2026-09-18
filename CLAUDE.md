# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

Starter Express API used as the sandbox project for the Claude Code course. This is a teaching repo — do not change the app code unless explicitly asked; the current task is Claude Code setup (CLAUDE.md + permissions), not feature work.

## Commands

- `npm run dev` — start the API on http://localhost:3000 (auto-restarts via `node --watch`)
- `npm test` — run all tests (Node's built-in test runner + supertest)
- `npm test -- --test-name-pattern="<name>"` — run a single test by name
- `npm run lint` — check code style with ESLint

## Conventions

- Double quotes and semicolons throughout (no Prettier/formatter configured — match surrounding style).
- Route handlers stay thin: validate input, call into `db/store.js`, return JSON. No business logic in `routes/`.
- Unused function args named `req`, `res`, `next`, or `_` are exempt from `no-unused-vars` (see `.eslintrc.json`).

## Architecture

- `server.js` is the sole entry point. It builds the Express `app`, mounts routers, and only calls `app.listen()` when run directly (`require.main === module`) — this lets `tests/` import `app` without binding a real port.
- One router file per resource under `routes/` (`users.js`, `health.js`), mounted in `server.js` at `/users` and `/health`.
- All data access goes through `db/store.js`, an in-memory array with no persistence — state resets on every restart. There is no real database in this project.
- CI (`.github/workflows/ci.yml`) runs `npm install`, `npm run lint`, `npm test` on push/PR with Node 22.
