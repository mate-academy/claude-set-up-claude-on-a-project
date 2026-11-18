# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

A small Express REST API (users + health check) backed by an in-memory store, used as the starter project for a Claude Code course.

## Commands

- `npm run dev` — start the API on http://localhost:3000 with `node --watch` (port via `PORT`)
- `npm test` — run all tests with Node's built-in runner (`node --test`)
- `node --test tests/users.test.js` — run one test file
- `node --test --test-name-pattern="404"` — run tests whose name matches a pattern
- `npm run lint` — ESLint (`eslint:recommended`); CI runs lint then tests on Node 22

## Conventions

- Use CommonJS (`require` / `module.exports`), not ES modules — ESLint is configured with `sourceType: "script"`.
- Write tests with `node:test` + `node:assert` + `supertest` against the exported `app`, not Jest/Mocha and not a live server.
- Access data only through functions in `db/store.js`; never import or mutate the store's arrays from routes.
- Return errors as JSON `{ "error": "<message>" }` with the matching status code (400 for invalid input, 404 for missing records).
- Add a short `// METHOD /path — what it does` comment above each route handler.

## Architecture

- `server.js` builds the Express app, mounts one router per resource (`/users`, `/health`), and only calls `listen()` when run directly — tests `require` it to get `app` without opening a port.
- `routes/` holds one `express.Router()` file per resource; a new resource means a new file here plus an `app.use(...)` line in `server.js`.
- `db/store.js` is an in-memory stand-in for a database. Data resets on restart, and state is shared across tests in the same process, so tests that create records must not assume exact counts.
