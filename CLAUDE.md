# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

Starter Express API with a health check and a `users` resource backed by an in-memory store.

## Commands

- `npm run dev` — start the API on http://localhost:3000 (auto-restarts on file changes)
- `npm test` — run the test suite (`node:test` + supertest)
- `npm run lint` — run ESLint

## Conventions

- CommonJS only (`require` / `module.exports`), not ES module `import` / `export`.
- Return errors as `{ error: "message" }` JSON with a non-2xx status (400 for bad input, 404 for not found).
- Always respond to the user in Ukrainian.

## Architecture

- `server.js` — entry point; builds the app, mounts route modules, and only calls `app.listen()` when run directly, so tests can `require("../server")` without opening a port.
- `routes/` — one `express.Router()` file per resource (`users.js`, `health.js`), mounted in `server.js`.
- `db/store.js` — sole data-access layer for the in-memory `users` array; routes use its exported functions instead of touching the array directly.
