# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

A minimal Express API — starter project for practicing Claude Code setup, not for building out the API.

## Commands

- `npm run dev` — start the API with auto-reload on http://localhost:3000
- `npm test` — run all tests (`node --test` + `supertest`)
- `npm run lint` — run ESLint

## Conventions

- Route handlers stay thin: validate input and shape the HTTP response, but delegate all data access to `db/store.js`.
- Unused-parameter lint exceptions are pre-configured for `req`, `res`, `next`, and `_` — no need to rename or prefix these.

## Architecture

- `server.js` — entry point; builds the Express app and mounts routes. Only calls `app.listen` when run directly, so tests can `require("./server")` and drive it with `supertest` without opening a real port.
- `routes/` — one file per resource (`users.js`, `health.js`), each exporting an `express.Router()` mounted in `server.js`.
- `db/store.js` — in-memory data access layer; routes call into it rather than holding data themselves. Data resets on every restart.
- `tests/` — integration-style tests hitting the Express app through `supertest`, one file per resource.
