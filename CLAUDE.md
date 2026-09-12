# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

A small Express API (starter project for the Claude Code course) with an in-memory user store.

## Commands

- `npm install` — install dependencies
- `npm run dev` — start the API with auto-reload (http://localhost:3000)
- `npm test` — run the test suite (Node's built-in test runner + supertest)
- `npm run lint` — check code style with ESLint

To run a single test file: `node --test tests/users.test.js`

## Architecture

- `server.js` — Express app entry point; mounts routers and exports `app` (without starting it) so tests can import it directly via supertest. The server only listens when the file is run directly (`require.main === module`).
- `routes/` — one router file per resource (`users.js`, `health.js`), mounted in `server.js`.
- `db/store.js` — in-memory data access layer; all data resets on server restart. Routes never touch data directly, they go through this module.
- `tests/` — Node test runner + supertest, importing `app` from `server.js` without opening a real port.

## Conventions

- New resources get their own file in `routes/`, mounted in `server.js`.
- Route handlers validate input and return JSON error bodies (`{ error: "..." }`) with the appropriate status code (400 for bad input, 404 for missing resources) rather than throwing.
- Data access goes through `db/store.js`, not inline in route handlers.
