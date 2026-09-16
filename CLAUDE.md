# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

Express REST API for users, with in-memory storage.

## Commands

- `npm run dev`: start the API on http://localhost:3000 (auto-restarts on change)
- `npm test`: run all tests; add `-- --test-name-pattern="<name>"` to run only matching tests
- `npm run lint`: ESLint. CI runs lint and then tests, and both must pass.

## Conventions

- Use CommonJS (`require` / `module.exports`), not ES modules.
- Read and write data through `db/store.js` functions, not the `users` array.
- Return errors as `{ "error": "<message>" }` with 400 or 404, not plain text.
- Write tests with `node:test` + `supertest` against the exported `app`, not Jest or Mocha.

## Architecture

- `server.js` is the entry point. It mounts one router per resource and exports `app`, and it only calls `listen` when run directly.
- `routes/<resource>.js` holds one `express.Router()` per resource. A new resource also needs an `app.use(...)` line in `server.js`.
- `db/store.js` is the only data layer. It is in memory and resets on restart, and all tests in a run share it.
