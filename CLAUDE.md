# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

A small Express REST API (users + health check) used as the starter project for the Claude Code course.

## Commands

- `npm run dev` — start the API on http://localhost:3000 (auto-restarts on file changes)
- `npm test` — run all tests with Node's built-in runner
- `node --test tests/users.test.js` — run a single test file
- `npm run lint` — ESLint; CI runs lint, then tests, on Node 22, so both must pass

## Conventions

- Use CommonJS (`require` / `module.exports`), not ES modules (`import` / `export`). ESLint is set to `sourceType: "script"`.
- Write tests with `node:test` + `node:assert` + `supertest`, not Jest or Mocha. Put them in `tests/*.test.js`.
- Return errors as JSON `{ error: "message" }` with the right status code (400 bad input, 404 not found).
- Never read or print `.env`; use `.env.example` to see which config keys exist.

## Architecture

- `server.js` builds and exports `app`, and only calls `listen()` when run directly. Tests import `app` and call it through `supertest` without opening a port.
- One router file per resource in `routes/`, mounted in `server.js` (`/users`, `/health`).
- All data access goes through `db/store.js`. Routes never touch the data directly. The store is in-memory and resets on every restart.
