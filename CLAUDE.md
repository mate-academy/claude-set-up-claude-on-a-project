# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

Starter Express API with users and health endpoints, backed by an in-memory store.

## Commands

- `npm run dev` — start the API with auto-reload on http://localhost:3000
- `npm test` — run all tests; `node --test tests/users.test.js` runs one file
- `npm run lint` — ESLint; lint and tests must both pass (CI runs them)

## Conventions

- Use CommonJS (`require`/`module.exports`), not ES modules.
- Access data through `db/store.js` functions, not by touching its arrays from routes.
- Return errors as `{ error: "<message>" }` with a 400 (bad input) or 404 (missing resource) status.
- Keep the `require.main === module` guard around `app.listen` in `server.js` so tests can import `app`.

## Architecture

- `server.js` — entry point; creates the Express app, mounts routers, exports `app`.
- `routes/` — one router file per resource (`users.js`, `health.js`), mounted by path in `server.js`.
- `db/store.js` — in-memory data helper; resets on restart.
- `tests/` — supertest against the exported `app`.
