# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

A minimal Express API (users + health endpoints) backed by an in-memory store, used as a course starter project.

## Commands

- `npm run dev` — start the API with auto-reload on http://localhost:3000
- `npm start` — start the API without auto-reload
- `npm test` — run all tests (`node --test`)
- `npm run lint` — run ESLint over the project

Run a single test file: `node --test tests/users.test.js`

## Conventions

- CommonJS throughout (`require`/`module.exports`), not ES modules.
- Route handlers never touch data directly — all reads/writes go through `db/store.js`.
- Error responses are `{ error: "message" }` with the appropriate status code (400 for bad input, 404 for missing resources).
- `eslint:recommended` is enforced; unused vars are a warn except for `req`, `res`, `next`, and `_`.

## Architecture

- `server.js` is the entry point: builds the Express app, mounts routers, and only calls `app.listen` when run directly (`require.main === module`) so `tests/` can import `app` and exercise it with `supertest` without opening a real port.
- `routes/` has one file per resource (`users.js`, `health.js`), each exporting an `express.Router()` mounted in `server.js`.
- `db/store.js` is the sole data-access layer — currently an in-memory array that resets on restart; swapping in a real database means changing only this file.
