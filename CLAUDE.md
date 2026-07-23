# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

A minimal Express API (starter for a Claude Code course) with in-memory data — no database, no auth. `users` and `health` are the only resources.

## Commands

```
npm install      # install dependencies
npm run dev      # start the API with auto-reload (http://localhost:3000)
npm start        # start the API without auto-reload
npm test         # run all tests (Node's built-in test runner)
npm run lint     # run eslint
```

Run a single test file: `node --test tests/users.test.js`

## Architecture

- `server.js` — builds and exports the Express `app`; only calls `app.listen` when run directly (`require.main === module`), so `tests/*.test.js` can import `app` and exercise it via `supertest` without opening a real port.
- `routes/` — one router file per resource (`users.js`, `health.js`), mounted in `server.js` under `/users` and `/health`.
- `db/store.js` — the only data access layer; an in-memory array with no persistence (resets on every restart). Routes call these functions rather than touching arrays directly.

## Conventions

- CommonJS (`require`/`module.exports`), not ESM.
- Route handlers validate input and return JSON error bodies directly (e.g. `{ error: "..." }`) with the appropriate status code — no shared error-handling middleware exists yet.
- Tests use `node:test` + `node:assert` + `supertest`, not a third-party test framework like Jest or Mocha.
