# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

A small Express REST API (users + health check) used as the starter project for a Claude Code course.

## Commands

- `npm run dev` — start the API with `node --watch` on `http://localhost:3000` (port from `PORT`)
- `npm test` — run all tests with Node's built-in runner (`node --test`)
- `node --test tests/users.test.js` — run one test file
- `node --test --test-name-pattern="404"` — run tests whose name matches a pattern
- `npm run lint` — ESLint (`eslint:recommended`, v8 `.eslintrc.json` config)

CI (`.github/workflows/ci.yml`) runs `npm run lint` then `npm test` on Node 22. Both must pass.

## Conventions

- CommonJS only: use `require` / `module.exports`, not `import` / `export` (ESLint runs with `sourceType: "script"`).
- Tests use `node:test` + `node:assert` + `supertest`, not Jest or Mocha. Import `app` from `../server` and call `request(app)`; never start a real server in tests.
- Route handlers access data only through `db/store.js` functions, never by touching the `users` array directly.
- Errors are returned as JSON `{ error: "<message>" }` with the matching status code (400 for validation, 404 for not found).
- Unused route params must be named `req`, `res`, `next`, or `_` to avoid lint warnings.
- Use async/await for api calls, not callbacks
- Prefer "const" instead "var" declarations where it is possible - modern JS only
- One route file per resource - don't combine code for different endpoints into one file

## Architecture

- `server.js` builds the Express app, mounts each router under its path (`/users`, `/health`), and exports `app`. It only calls `listen()` when run directly (`require.main === module`), which is what lets tests import it.
- `routes/` holds one `express.Router()` file per resource. Adding a resource means a new route file plus an `app.use(...)` line in `server.js`.
- `db/store.js` is an in-memory stand-in for a database. State resets on restart but is shared across all tests in one process, so tests must not assume a fixed user count or ID.
- The app code is intentionally minimal; the course goal is configuring Claude Code (`CLAUDE.md`, `.claude/settings.json`, `NOTES.md`), not changing the API.
