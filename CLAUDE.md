# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

Starter Express API for the Claude Code course — a minimal REST service used as a practice ground for setting up Claude Code, not a production app.

## Commands

- `npm run dev` — start the API with auto-reload (`node --watch server.js`) on `http://localhost:3000`
- `npm test` — run all tests (`node --test`, using `node:test` + `supertest`)
- `npm test -- --test-name-pattern="<name>"` — run a single test by name
- `npm run lint` — check code style with ESLint

## Conventions

- Route handlers go in `routes/`, one file per resource (e.g. `users.js`, `health.js`); mount new resources in `server.js`.
- All data access goes through `db/store.js` — routes never manipulate data directly.
- Use CommonJS (`require`/`module.exports`), not ES module `import`/`export`.
- Unused-var linting ignores `_`, `req`, `res`, `next` — don't rename handler params to silence lint warnings.

## Architecture

- `server.js` is the entry point: builds the Express app, mounts routers, and only calls `app.listen` when run directly (so tests can `require("../server")` without opening a real port).
- `db/store.js` is an in-memory data store (plain arrays/objects) standing in for a real database — data resets on every restart.
- Tests in `tests/` hit the app through `supertest` against the exported `app`, not a running server.
