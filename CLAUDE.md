# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

A small Express REST API used as the practice codebase for the Claude Code course. It exposes `/users` and `/health` endpoints backed by an in-memory store.

## Commands

- `npm install` — install dependencies
- `npm run dev` — start the API with auto-reload (`node --watch`) on http://localhost:3000
- `npm start` — start the API without watch
- `npm test` — run all tests (built-in `node --test` runner)
- `npm run lint` — run ESLint over the project
- Run a single test file: `node --test tests/users.test.js`

CI (`.github/workflows/ci.yml`) runs `npm run lint` then `npm test` on Node 22 for every push and PR — both must pass.

## Architecture

- `server.js` — entry point. Builds the Express app, mounts routers, and only calls `app.listen` when run directly (`require.main === module`). It exports `app` so tests can import it with supertest without opening a port.
- `routes/` — one file per resource (`users.js`, `health.js`), each an `express.Router`. Mount new resources here and register them in `server.js`.
- `db/store.js` — the only data-access layer. It's an in-memory array (data resets on restart) exposing `getAllUsers`, `getUserById`, `createUser`. Routes must go through this module rather than touching data directly, so a real database can later replace it in one place.
- `tests/` — `node:test` + `assert` + `supertest`, hitting the exported `app`.

## Conventions

- Use CommonJS (`require` / `module.exports`), not ESM. ESLint is configured with `sourceType: "script"`.
- Keep all data access in `db/store.js`; do not read or mutate the users array from route handlers.
- `req`, `res`, `next`, and `_`-prefixed args are exempt from the no-unused-vars rule — use those names for unused Express handler params.
- Validate request input in the route handler and return the existing error shape `{ error: "message" }` with the appropriate status (400 for bad input, 404 for missing resource).
