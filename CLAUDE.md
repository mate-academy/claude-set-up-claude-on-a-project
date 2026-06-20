# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

A small Express REST API exposing `/users` and `/health` endpoints over an in-memory data store.

## Commands

- `npm run dev` — start the API with file watching on http://localhost:3000
- `npm test` — run all tests (Node's built-in `node --test` runner)
- `npm run lint` — ESLint over the project
- `node --test tests/users.test.js` — run a single test file

## Conventions

- Use CommonJS (`require` / `module.exports`), not ES modules.
- Use the Node built-in test runner (`node:test`, `node:assert`) with `supertest`, not a third-party framework like Jest.
- Read config from `process.env` (e.g. `process.env.PORT`), not hardcoded values.

## Architecture

- `server.js` — entry point: builds the Express `app`, mounts routers, and only calls `app.listen` when run directly, so tests import `app` without opening a port.
- `routes/` — one router file per resource (`users.js`, `health.js`), each mounted under its own path prefix.
- `db/store.js` — all data access goes here; an in-memory store that resets on restart and is shared across requests and tests.
