# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

A small Express REST API (users + health check) backed by an in-memory store. It's the starter project for a Claude Code course.

This is my attempt at using git clone for my efforts to learn claude code.

## Commands

- `npm run dev`: start the API on http://localhost:3000 (`PORT` env var overrides). It runs `node --watch server.js`, so it auto-restarts on file changes and keeps running until stopped. Don't run it in the foreground; use a background shell or test through `npm test` instead.
- `npm test`: run all tests with Node's built-in runner (`node --test`)
- `node --test tests/users.test.js`: run a single test file
- `node --test --test-name-pattern="404" tests/`: run tests whose name matches a pattern
- `npm run lint`: run ESLint over the repo
- `npm run lint && npm test`: run the same checks as CI. Run this before committing.
- `npm install`: install dependencies. Run it after cloning or after `package.json` changes.

CI (`.github/workflows/ci.yml`) runs `npm run lint` and then `npm test` on Node 22, so both have to pass.

## Conventions

- Use CommonJS (`require` / `module.exports`), not ES modules. ESLint is configured with `sourceType: "script"`.
- Write tests with `node:test` + `node:assert` and drive HTTP through `supertest` against the exported `app`. Don't add Jest or Mocha, and don't start a real server in tests.
- Routes access data only through functions exported from `db/store.js`. They never touch the arrays directly.
- Error responses use the shape `{ error: "<message>" }` with the matching status code (400 for validation, 404 for not found). A successful create returns 201.
- Unused-var lint warnings are suppressed for args named `_`, `req`, `res`, or `next`. Keep the standard Express handler signatures.
- Use double quotes and semicolons. ESLint doesn't enforce this, so match the existing files by hand.
- Put a one-line comment above each route handler in the form `// METHOD /path — what it does` (e.g. `// GET /users/:id — fetch a single user, or 404 if it doesn't exist`).

## Architecture

- `server.js` builds the Express app, mounts one router per resource (`/users` → `routes/users.js`, `/health` → `routes/health.js`), and exports `app`. It calls `listen()` only when `require.main === module`, which is what lets tests import it without binding a port.
- `routes/` holds one `express.Router()` file per resource. To add a resource, create `routes/<name>.js` and mount it in `server.js`.
- `db/store.js` is a module-level in-memory store standing in for a database. Data resets on every restart. Because state is shared across all tests in a process, tests that create records affect later tests (assert with `>=`, not exact counts).
- The only middleware is `express.json()`, mounted in `server.js`. There is no auth, validation library, or central error handler, so each handler validates its own input and sends its own error response.
- Config comes from env vars. `.env.example` documents them, and the real `.env` is git-ignored (nothing loads it automatically; there is no dotenv).
