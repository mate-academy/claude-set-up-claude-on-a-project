# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project overview

Starter Express API for the Claude Code course. A minimal REST API with an in-memory data store, used as a sandbox for setting up Claude Code — not a production app.

## Commands

- `npm run dev` — start the API with auto-reload (http://localhost:3000)
- `npm test` — run all tests (Node's built-in test runner + supertest)
- `node --test tests/users.test.js` — run a single test file
- `npm run lint` — run ESLint

## Conventions

- Add new resources as their own file under `routes/`, mounted in `server.js` — don't add route handlers directly in `server.js`.
- Route handlers read/write data only through `db/store.js` — don't manipulate the in-memory arrays directly from a route file.

## Architecture

- `server.js` — Express app entry point; mounts routers under `/users` and `/health`. Starts listening only when run directly (`require.main === module`), so `tests/` can `require()` the exported `app` and hit it with supertest without binding a real port.
- `routes/` — one file per resource (`users.js`, `health.js`), each exporting an `express.Router()` mounted in `server.js`.
- `db/store.js` — in-memory array-backed data store standing in for a real database; state is not persisted and resets on every restart.
- `tests/` — integration-style tests using `node:test` + `supertest`, exercising routes through the exported `app`.
