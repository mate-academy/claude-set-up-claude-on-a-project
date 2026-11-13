# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

A small Express REST API (users + health check) backed by an in-memory store, used as the base project for the Claude Code course.

## Commands

Use Node 22, the version CI uses. `--test-name-pattern` needs Node 18.11+.

- `npm run dev`: start the API with auto-reload on http://localhost:3000 (`PORT` env var overrides)
- `npm test`: run all tests with Node's built-in runner (`node --test`)
- `node --test tests/users.test.js`: run a single test file
- `node --test --test-name-pattern="404" tests/`: run tests whose name matches
- `npm run lint`: ESLint (`eslint:recommended`)

CI (`.github/workflows/ci.yml`, Node 22) runs `npm run lint` then `npm test`. Both must pass.

## Conventions

- CommonJS only (`require` / `module.exports`). ESLint is set to `sourceType: "script"`, so `import`/`export` will not lint.
- Tests use `node:test` + `node:assert` + `supertest`. Do not add Jest, Mocha, or another test framework.
- Routes never touch data directly. All reads and writes go through functions exported from `db/store.js`.
- Error responses are JSON shaped `{ error: "<message>" }` with the matching status code (400 for validation, 404 for not found).
- Never read or print `.env`. Use `.env.example` to see which config keys exist.

## Architecture

- `server.js` builds the Express app, mounts one router per resource (`/users`, `/health`), and exports `app`. It only calls `listen()` when run directly (`require.main === module`), so tests import `app` and hit it via `supertest` without opening a port. Keep that guard.
- `routes/<resource>.js`: one `express.Router()` per resource, mounted in `server.js`. A new resource means a new file here plus a `app.use(...)` line.
- `db/store.js`: module-level in-memory arrays standing in for a database. State resets on restart but is **shared across tests in the same process**, so tests that create users affect later ones. Don't assert exact counts.
- Route params arrive as strings. Convert them (e.g. `Number(req.params.id)`) before passing them to the store, which compares ids strictly.
