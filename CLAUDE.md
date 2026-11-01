# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

A small Express REST API (users + health check) backed by an in-memory store, used as the starter project for the Claude Code course.

## Commands

- `npm run dev` — start the API with `node --watch` on http://localhost:3000 (`PORT` overrides)
- `npm test` — run all tests with the built-in Node test runner (`node --test`)
- `node --test --test-name-pattern="404" tests/users.test.js` — run a single test by name
- `npm run lint` — ESLint (`eslint:recommended`)

CI (`.github/workflows/ci.yml`) runs `npm run lint` then `npm test` on Node 22; both must pass.

## Conventions

- Use CommonJS (`require` / `module.exports`), not ES modules — ESLint is configured with `sourceType: "script"`.
- Routes never touch data directly; all reads/writes go through functions exported from `db/store.js`. Add a store function rather than importing the `users` array.
- Error responses are JSON shaped `{ error: "<message>" }` with the matching status (400 for invalid input, 404 for missing records).
- Tests use `node:test` + `node:assert` + `supertest` against the exported `app` — not Jest/Mocha, and never start a real server.
- Precede each route handler with a `// METHOD /path — what it does` comment, matching the existing routes.

## Architecture

- `server.js` builds the Express app, mounts each router under its resource path (`/users`, `/health`), and exports `app`. It only calls `app.listen` when run directly (`require.main === module`), which is what lets tests import it.
- `routes/` holds one `express.Router` file per resource; a new resource means a new file here plus an `app.use(...)` line in `server.js`.
- `db/store.js` is module-level in-memory state seeded with two users. It resets on restart but is **shared across all tests in a run**, so tests that create users can affect later assertions — don't assume exact counts or IDs.
- Config comes from env vars (see `.env.example`); `.env` is git-ignored.
