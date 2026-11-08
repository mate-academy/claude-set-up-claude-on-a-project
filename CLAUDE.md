# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

A small Express REST API (users + health check) backed by an in-memory store, used as the starter project for the Claude Code course.

## Commands

- `npm run dev` — start the API with auto-reload on http://localhost:3000 (`PORT` overrides)
- `npm test` — run all tests with Node's built-in runner (`node --test`)
- `node --test tests/users.test.js` — run a single test file
- `npm run lint` — ESLint; CI runs `lint` then `test` on Node 22, so both must pass

## Conventions

- Use CommonJS (`require` / `module.exports`), not ES modules — ESLint is configured with `sourceType: "script"`.
- Return errors as JSON `{ error: "<message>" }` with the matching status code (400 validation, 404 not found); never send plain-text errors.
- Write tests with `node:test` + `node:assert` and `supertest` against the exported `app` — do not add Jest/Mocha or start a real server in tests.
- Route handlers access data only through functions exported by `db/store.js`; don't touch the `users` array directly from routes.
- Unused `req`, `res`, `next`, and `_` params are allowed by lint; don't remove them from handler signatures.

## Architecture

- `server.js` builds the Express app, mounts routers, and exports `app`; it only calls `listen()` when run directly (`require.main === module`) so tests can import it.
- `routes/` has one `express.Router()` file per resource, mounted in `server.js` at `/<resource>` (e.g. `routes/users.js` → `/users`). New resources get a new file plus a mount line.
- `db/store.js` is an in-memory stand-in for a database: data resets on every restart, and IDs come from an incrementing `nextId`. Tests share this state, so don't assume a fixed user count.
