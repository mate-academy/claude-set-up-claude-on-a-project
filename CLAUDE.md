# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

Starter Express API for the Claude Code course. This repo itself is not the deliverable — the task is to add a `CLAUDE.md`, `.claude/settings.json`, and `NOTES.md` around it without changing the app code.

## Commands

- `npm install` — install dependencies
- `npm run dev` — start the API with auto-restart on http://localhost:3000
- `npm start` — start the API without watch mode
- `npm test` — run all tests (Node's built-in test runner)
- `node --test tests/users.test.js` — run a single test file
- `npm run lint` — run ESLint (`eslint:recommended`, warns on unused vars except `_`, `req`, `res`, `next`)

CI (`.github/workflows`) runs `npm install`, `npm run lint`, and `npm test` on every push/PR.

## Architecture

- `server.js` — entry point; builds the Express `app`, mounts route modules, and only calls `app.listen` when run directly (`require.main === module`) so tests can `require("../server")` and drive it with `supertest` against an in-process app, no real port needed.
- `routes/` — one file per resource (`users.js`, `health.js`), each exporting an `express.Router()`.
- `db/store.js` — in-memory data layer (a plain array + counter). No persistence: state resets on every restart. Routes should go through this module rather than holding their own state.
- `tests/` — Node's built-in `test`/`assert` plus `supertest`, one file per resource, importing `app` directly.

## Conventions

- Config comes from `.env` (git-ignored); `.env.example` documents the shape. No secrets belong in code or commits.
- use async/await, not callbacks
