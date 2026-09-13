# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

Express REST API for user management (course starter project).

## Commands

- `npm run dev` — start the API with file watching on http://localhost:3000
- `npm test` — run all tests (Node.js built-in test runner)
- `npm run lint` — check code style with ESLint
- `npm run test -- --test-name-pattern="health"` — run a single test by name

## Conventions

- Use `require()` (CommonJS), not ES module `import` — `sourceType` is set to `"script"` in ESLint config
- One route file per resource in `routes/`, mounted in `server.js` (e.g. `app.use("/users", usersRoutes)`)
- Express handler params `req`, `res`, `next` are not flagged as unused by the linter — use those names, not aliases
- Tests use `node:test` and `node:assert` with `supertest` for HTTP assertions — no Jest, no Mocha

## Architecture

- `server.js` — app entry point; creates the Express app, mounts route files, and conditionally starts the server (exports `app` for testing without opening a port)
- `routes/` — each file exports an Express Router for one resource (`users.js`, `health.js`)
- `db/store.js` — in-memory data store shared across routes; resets on restart (no real database)
- `tests/` — test files use supertest against the exported `app`; run with `node --test`
