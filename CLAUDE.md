# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

A minimal Express REST API (`/users`, `/health`) used as the practice codebase for the Claude Code course. It exists so course exercises have a real project to work on; the app code itself is not the deliverable.

## Commands

- `npm install` — install dependencies
- `npm run dev` — start the API with file watching on http://localhost:3000
- `npm test` — run all tests (Node's built-in `node --test` runner)
- `node --test tests/users.test.js` — run a single test file
- `npm run lint` — ESLint over the whole repo

CI (`.github/workflows/ci.yml`) runs `npm run lint` then `npm test` on Node 22 for every push and PR; both must pass.

## Conventions

- Use `require` / `module.exports` (CommonJS), not ESM `import`. ESLint is configured with `sourceType: "script"`.
- Use the built-in `node --test` runner and `node:assert` for tests, with `supertest` for HTTP assertions. Do not add Jest, Mocha, or other test frameworks.
- Import the app from `server.js` in tests — it exports `app` without calling `listen()` unless run directly, so tests never open a real port.
- Add a new resource as its own file in `routes/`, mount it in `server.js` with `app.use("/<resource>", ...)`, and reach data only through `db/store.js` — routes never touch the data array directly.
- Route handlers validate required fields and return `{ error: "..." }` with an appropriate status (`400` bad input, `404` not found), matching the existing handlers in `routes/users.js`.

## Architecture

- `server.js` — entry point. Creates the Express app, registers `express.json()`, mounts one router per resource, and only calls `listen()` when run directly.
- `routes/` — one file per resource (`users.js`, `health.js`), each exporting an `express.Router()`.
- `db/store.js` — the single data-access layer: an in-memory array with `getAllUsers` / `getUserById` / `createUser`; data resets on every restart. Swapping in a real database should mean changing only this file.
- `tests/` — HTTP-level tests that exercise the app through `supertest`.
