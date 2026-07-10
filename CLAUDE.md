# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

Minimal Express API starter with a `users` resource and a `/health` check.

## Commands

- `npm install` — install dependencies
- `npm run dev` — start the API on http://localhost:3000, auto-restarts on file changes (`node --watch`)
- `npm test` — run the test suite (`node --test`); run a single file with `node --test tests/users.test.js`
- `npm run lint` — run ESLint

## Architecture Review

- `server.js` — builds the Express app and mounts routes, but only calls `app.listen()` when run directly (`require.main === module`). This lets tests `require("../server")` and exercise the app via `supertest` without opening a real port.
- `routes/` — one file per resource (`users.js`, `health.js`), each exporting an `express.Router()` mounted in `server.js`.
- `db/store.js` — in-memory data store standing in for a real database; state resets on every server restart.

## Conventions

- CommonJS modules (`require`/`module.exports`), not ESM — set by `.eslintrc.json`'s `sourceType: "script"`.
- Route handlers validate input inline and return JSON error bodies (`{ error: "..." }`) with the appropriate status code (400, 404) rather than throwing.
