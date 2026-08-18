# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

A small Express API for managing users, backed by an in-memory store.

## Commands

- `npm run dev` — start the API on http://localhost:3000 with auto-restart (`node --watch`)
- `npm test` — run all tests (Node's built-in test runner)
- `npm run lint` — run ESLint

## Conventions

- Use CommonJS (`require` / `module.exports`), not ES module `import` / `export` — matches the existing code and the `sourceType: "script"` setting in `.eslintrc.json`.
- Routes never touch the `users` array directly — always read or write data through the functions exported by `db/store.js`.

## Architecture

- `server.js` — entry point; builds the Express app and mounts routes. Only calls `app.listen` when run directly (`require.main === module`), so `tests/` can `require("../server")` and exercise the app in-process via `supertest` without opening a real port.
- `routes/` — one router file per resource (`users.js`, `health.js`), mounted in `server.js` under `/users` and `/health`. Route handlers validate input and delegate data access to `db/store.js`.
- `db/store.js` — in-memory data store standing in for a real database. State resets on every restart; there is no persistence layer to reason about.
- `tests/` — integration-style tests that hit the Express app through `supertest` rather than unit-testing handlers in isolation.
