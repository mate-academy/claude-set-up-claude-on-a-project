# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

A small Express REST API (users + health check) backed by an in-memory store, used as the starter project for a Claude Code course.

## Commands

- `npm run dev` — start the API with `node --watch` on http://localhost:3000 (`PORT` overrides)
- `npm test` — run all tests with the built-in Node test runner (`node --test`, picks up `tests/*.test.js`)
- `node --test --test-name-pattern="404" tests/users.test.js` — run a single test by name
- `npm run lint` — ESLint (`eslint:recommended`); CI runs lint then tests on Node 22, so both must pass

## Architecture

- `server.js` builds the Express app, mounts one router per resource (`/users`, `/health`), and exports `app`. It only calls `listen()` when run directly (`require.main === module`), so tests import `app` without opening a port.
- `routes/<resource>.js` — one `express.Router()` per resource; mount new ones in `server.js`.
- `db/store.js` — the only data layer: module-level arrays, reset on every restart. Its state is shared across all tests in a run, so tests that create data affect later ones.

## Conventions

- Use CommonJS (`require` / `module.exports`), not ES modules — ESLint is configured with `sourceType: "script"`.
- Routes never touch data directly; add a function to `db/store.js` and call it from the route.
- Error responses are JSON `{ error: "<message>" }` with the matching status (400 for invalid input, 404 for missing resources); creation returns 201.
- Route params arrive as strings — convert IDs with `Number()` before calling the store (IDs are numeric).
- Tests use `node:test` + `node:assert` + `supertest` against the exported `app`; don't add Jest/Mocha.
- Never read or commit `.env`; add new config keys to `.env.example` instead.
