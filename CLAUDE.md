# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

A minimal Express API serving users and health endpoints.

## Commands

- `npm run dev` — start the API with auto-reload on http://localhost:3000
- `npm test` — run all tests
- `npm run lint` — check code style with ESLint

## Conventions

- Use CommonJS (`require`/`module.exports`), not ES module `import`/`export`.
- On invalid input, return a JSON error body (`{ error: "..." }`) with a 400/404 status, not a thrown exception.
- Read and write user data through `db/store.js`'s exported functions, not by mutating its internal arrays directly.

## Architecture

- `server.js` is the entry point: builds the Express app and mounts routes, exporting `app` (without calling `listen()`) so tests can import it directly.
- `routes/` has one file per resource (`users.js`, `health.js`), each an Express `Router` mounted in `server.js`.
- `db/store.js` is the in-memory data layer that all routes go through; data resets on every restart.
