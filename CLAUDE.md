# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

Starter Express API for the Claude Code course projects.

## Commands

- `npm run dev` — start the API with auto-restart on file changes (`node --watch server.js`), on `http://localhost:3000`
- `npm test` — run all tests (Node's built-in test runner, via `node --test`)
- `npm test -- --test-name-pattern="<name>"` — run a single test by name
- `npm run lint` — check code style with ESLint
- CI (`.github/workflows/ci.yml`) runs `npm install`, `npm run lint`, `npm test` on every push/PR — match this locally before pushing

## Architecture

- `server.js` — entry point; builds the Express app, mounts routers, and only calls `app.listen()` when run directly (`require.main === module`). This lets `tests/*.test.js` `require("../server")` and drive the app with `supertest` against the exported `app` without opening a real port.
- `routes/` — one router file per resource (`users.js`, `health.js`), mounted in `server.js` under its own path prefix. Routes call into `db/store.js` for data; they don't hold state themselves.
- `db/store.js` — in-memory data store standing in for a real database. Data resets on every server restart; there is no persistence layer to reason about.
- `tests/` — integration-style tests that hit routes through `supertest` rather than unit-testing handlers directly.

## Conventions

- CommonJS throughout (`require`/`module.exports`), not ESM.
- ESLint config is `eslint:recommended` with `no-unused-vars` as a warning (ignores `_`, `req`, `res`, `next`).
