# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project overview

A minimal Express API starter (users + health endpoints backed by an in-memory store), used as the base project for the Claude Code course.

## Commands

- `npm run dev` — start the API with auto-reload on `http://localhost:3000`
- `npm start` — start the API without auto-reload
- `npm test` — run all tests (Node's built-in test runner + supertest)
- `npm run lint` — run ESLint

To run a single test file: `node --test tests/users.test.js`

## Conventions

- CommonJS modules throughout (`require`/`module.exports`), not ESM import/export.
- One route file per resource under `routes/`, mounted in `server.js`.
- ESLint config (`.eslintrc.json`) extends `eslint:recommended`; unused-vars is a warning, with `req`/`res`/`next`/`_`-prefixed args exempted.

## Architecture

- `server.js` is the entry point: builds the Express app, mounts routers, and only calls `app.listen` when run directly (`require.main === module`) — this lets `tests/` import `app` from `server.js` and drive it with supertest instead of hitting a real port.
- `routes/` holds one router per resource (`users.js`, `health.js`); each exports an `express.Router()`.
- `db/store.js` is a tiny in-memory data layer — data resets on every restart. All data access from routes goes through this module rather than touching arrays directly.
- `.env` (git-ignored) holds real config; `.env.example` documents the shape. `PORT` is the only variable currently read (in `server.js`).
