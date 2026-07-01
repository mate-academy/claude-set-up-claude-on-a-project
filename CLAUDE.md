# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

A small Express REST API (users + health check) backed by an in-memory data store.

## Commands

- `npm run dev` — start the API with auto-reload on http://localhost:3000
- `npm test` — run all tests; `node --test tests/users.test.js` runs a single file
- `npm run lint` — check code style with ESLint

## Conventions

- Use CommonJS (`require`/`module.exports`), not ES modules — ESLint runs with `sourceType: "script"`.
- Access data only through `db/store.js`; never touch the data array directly from a route.
- Return errors as JSON `{ error: "..." }` with the right status (`400` validation, `404` not found), as in `routes/users.js`.

## Architecture

- `server.js` — entry point; mounts one router per resource and exports `app`. It only calls `app.listen()` when run directly, so tests import `app` without opening a port.
- `routes/` — one file per resource (`users.js`, `health.js`), each an `express.Router()`. Add a resource by creating a route file and mounting it in `server.js`.
- `db/store.js` — in-memory data helper standing in for a database; data resets on restart.
