# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

A small Express 4 REST API (users + health check) backed by an in-memory store. It is the starter repo for the Claude Code course; later course projects build on it.

## Commands

- `npm run dev` — start the API with `node --watch` on http://localhost:3000
- `npm test` — run all tests (`node --test`)
- `node --test tests/users.test.js` — run one test file
- `node --test --test-name-pattern="POST /users"` — run tests whose name matches
- `npm run lint` — ESLint over the whole repo

CI (`.github/workflows/ci.yml`) runs lint then tests on Node 22; both must pass.

## Conventions

- Use CommonJS (`require` / `module.exports`), not ES modules — ESLint parses files as `sourceType: "script"`.
- Write tests with the built-in `node:test` and `node:assert` plus `supertest`, not Jest/Mocha. Tests import `app` from `../server` and never start a listener.
- Return errors as JSON `{ "error": "<message>" }` with the matching status code (400 for validation, 404 for missing resources).
- Route handlers never touch data directly; add a function to `db/store.js` and call it from the route.
- Precede each route handler with a `// METHOD /path — description` comment, as the existing routes do.

## Architecture

- `server.js` builds the Express app, mounts each router under its path prefix, and exports `app`. It only calls `listen` when run directly (`require.main === module`), which is what lets tests import it without opening a port.
- `routes/` has one router file per resource. Adding a resource means a new file here plus an `app.use("/<name>", ...)` line in `server.js`.
- `db/store.js` is the only data layer: module-level arrays with an incrementing id. Data resets on every restart, and is shared across all tests within a single test file, so tests should not assume a pristine store after a `POST`.

## Gotchas

- Nothing loads `.env` (there is no `dotenv`); `PORT` only takes effect if set in the shell environment.
- The `.env` and `.claude/settings.local.json` entries in `.gitignore` are indented, so git does not actually match them. Check `git status` before committing if either file exists.

