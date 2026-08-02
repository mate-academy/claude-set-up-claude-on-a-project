# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

A minimal Express REST API (starter project for the Claude Code course) exposing `/users` and `/health` endpoints backed by an in-memory store.

## Commands

- `npm run dev` — start the API with auto-reload on `http://localhost:3000`
- `npm test` — run all tests (Node's built-in test runner + Supertest)
- `node --test tests/users.test.js` — run a single test file
- `npm run lint` — check code style with ESLint

## Conventions

- CommonJS throughout (`require`/`module.exports`), not ESM.
- One route file per resource under `routes/`, mounted in `server.js` (e.g. `routes/users.js` → `app.use("/users", usersRoutes)`).
- Unused-arg lint rule ignores `_`, `req`, `res`, `next` — don't rename handler params to silence it.

## Architecture

- `server.js` is the entry point: builds the Express app, mounts routers, and only calls `app.listen` when run directly (`require.main === module`) — this lets `tests/` import `app` and drive it with Supertest without opening a real port.
- Data access goes through `db/store.js`, a tiny in-memory array-backed store (no persistence, resets on restart). Routes call its exported functions rather than touching arrays directly.
- Real secrets belong in a git-ignored `.env` (see `.env.example`); nothing in the current code reads env vars beyond `PORT`.
