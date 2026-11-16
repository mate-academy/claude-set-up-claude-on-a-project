# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

A small Express 4 REST API (users + health check) backed by an in-memory store. It is the starter project for a Claude Code course; the README's tasks are about Claude Code setup (`CLAUDE.md`, `.claude/settings.json`, `NOTES.md`), not about changing the app code.

## Commands

```
npm install
npm run dev      # node --watch server.js, serves http://localhost:3000 (PORT overrides)
npm test         # Node's built-in test runner (node --test)
npm run lint     # eslint .
```

- Single test file: `node --test tests/users.test.js`
- Single test by name: `node --test --test-name-pattern="POST /users"`
- CI (`.github/workflows/ci.yml`) runs `npm run lint` then `npm test` on Node 22; run both before committing.

## Conventions

- CommonJS only (`require` / `module.exports`), not ES modules — ESLint is configured with `sourceType: "script"`.
- Tests use `node:test` + `node:assert` with `supertest` against the imported `app`. Do not add Jest, Mocha, or another test framework.
- Route handlers never touch data directly; they call functions exported from `db/store.js`. Add a new store function rather than reaching into the `users` array.
- Errors are returned as JSON `{ "error": "<message>" }` with the matching status code (400 for validation, 404 for missing resources); successful creates return 201 with the created object.
- Read config from `process.env` with a default, and document any new variable in `.env.example`. Never read or commit `.env`.

## Architecture

- `server.js` builds the Express app, mounts each router under its path prefix, and exports `app`. It only calls `app.listen` when run directly (`require.main === module`), which is what lets tests import the app without opening a port — keep that guard.
- `routes/` has one file per resource, each exporting an `express.Router()` with paths relative to its mount point. Adding a resource means a new file in `routes/` plus an `app.use(...)` line in `server.js`.
- `db/store.js` is the only data layer: module-level state that resets on every restart. Because it is module state, it is also shared across all tests in a process — tests that create users will affect later assertions, so assert on shape/status rather than exact counts.
