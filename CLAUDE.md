# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

A small Express API (course starter project) with an in-memory data store — no real database or persistence.

## Commands

- `npm run dev` — start the API on http://localhost:3000 (auto-restarts on change via `node --watch`)
- `npm test` — run the tests (Node's built-in test runner + supertest); run a single file with `node --test tests/users.test.js`
- `npm run lint` — check code style with ESLint

## Architecture

- `server.js` — entry point; builds and exports the Express `app`, only calls `.listen()` when run directly (so tests can `require("../server")` without opening a port)
- `routes/` — one file per resource (`users.js`, `health.js`), mounted in `server.js`
- `db/store.js` — in-memory data access layer; routes call into it rather than holding state themselves. Data resets on every restart.

## Conventions

- Double quotes and semicolons throughout (matches ESLint config); use `const`/`let`, not `var`.
- Route handlers validate input and return JSON error bodies (`{ error: "..." }`) with the appropriate status code (400/404) rather than throwing.
