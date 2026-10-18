# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

A small Express REST API (users + health check) backed by an in-memory store, used as the starter project for a Claude Code course.

## Commands

- `npm run dev` — start the API on http://localhost:3000 with `node --watch` (port via `PORT`)
- `npm test` — run all tests with Node's built-in runner (`node --test`)
- `node --test tests/users.test.js` — run one test file
- `node --test --test-name-pattern="404"` — run tests whose name matches a pattern
- `npm run lint` — ESLint over the whole repo

CI (`.github/workflows/ci.yml`) runs `npm run lint` then `npm test` on Node 22 for every push and PR; both must pass.

## Conventions

- Use CommonJS (`require` / `module.exports`), not ES modules — ESLint is configured with `sourceType: "script"`.
- Route handlers access data only through functions exported from `db/store.js`; never touch the `users` array or keep data in route files.
- Return errors as JSON `{ error: "<message>" }` with the matching status code (400 for invalid input, 404 for missing resources), as in `routes/users.js`.
- Convert `req.params.id` with `Number()` before lookups — store IDs are numbers and are compared with `===`.
- Tests use `supertest` against the `app` exported from `server.js`; never call `app.listen()` in tests.
- Use double-quoted strings and semicolons, matching existing files.

## Architecture

- `server.js` builds the Express app, applies `express.json()`, mounts each router under its path (`/users`, `/health`), and exports `app`. It only calls `listen()` when run directly (`require.main === module`), which is what lets tests import it.
- `routes/` holds one `express.Router()` file per resource. Adding a resource means a new file here plus an `app.use("/<path>", ...)` line in `server.js`.
- `db/store.js` is a module-level in-memory store seeded with two users. Data resets on restart, and state is shared across all tests in the same process — a test that creates users affects later ones.
