# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project overview

Starter Express API for the Claude Code course projects — an in-memory `users` resource plus a health check endpoint.

## Commands

- `npm run dev` — start the API with auto-restart on file changes (http://localhost:3000)
- `npm test` — run the test suite (Node's built-in test runner + supertest)
- `npm run lint` — check code style with ESLint

## Conventions

- Use `require`/`module.exports` (CommonJS), not ES module `import`/`export` — `package.json` has no `"type": "module"` and ESLint is configured for `sourceType: "script"`.
- Use double quotes and semicolons, matching the existing route and store files.
- Keep one route file per resource under `routes/`, and put all data access behind `db/store.js` — route handlers should not touch the in-memory data directly.

## Architecture

- `server.js` is the entry point; it wires route modules onto the Express app and only calls `app.listen` when run directly, so tests can `require` the app without opening a port.
- `routes/` holds one file per resource (`users.js`, `health.js`), each exporting an `express.Router()`.
- `db/store.js` is a tiny in-memory data helper (no real database) — all reads/writes to `users` go through its exported functions.
