# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

A minimal Express API (users + health endpoints) backed by an in-memory store, used as the starter project for the Claude Code course.

## Commands

- `npm run dev` — start the API with auto-reload on http://localhost:3000
- `npm test` — run the tests (Node's built-in test runner + supertest)
- `npm run lint` — check code style with ESLint
- `node --test tests/users.test.js` — run a single test file

## Conventions

- Use `require`/`module.exports` (CommonJS), not ES modules — see `parserOptions.sourceType: "script"` in `.eslintrc.json`.
- One route file per resource under `routes/` (e.g. `users.js`, `health.js`), mounted in `server.js`.
- All data access goes through `db/store.js` — routes never touch the `users` array directly.

## Architecture

- `server.js` is the entry point: builds the Express app, mounts routers, and only calls `app.listen` when run directly (`require.main === module`), so `tests/` can import `app` without opening a real port.
- `db/store.js` is a tiny in-memory data layer standing in for a real database; state resets on every restart.
- Real secrets belong in `.env` (git-ignored); `.env.example` documents the shape.
