# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

Small Express REST API (users + health check) used as the starter project for a Claude Code course.

## Commands

- `npm run dev`: start the API on http://localhost:3000 with `node --watch` (set `PORT` to change the port)
- `npm test`: run all tests with Node's built-in runner (`node --test`)
- `node --test --test-name-pattern="404" tests/users.test.js`: run a single test by name
- `npm run lint`: run ESLint (`eslint:recommended`, ESLint 8 `.eslintrc.json` format)

CI (`.github/workflows/ci.yml`) runs `npm run lint` and then `npm test` on Node 22 for every push and PR.

## Conventions

- Use CommonJS (`require` / `module.exports`), not ES modules. ESLint is set to `sourceType: "script"`.
- Write tests with `node:test` + `node:assert` + `supertest`, not Jest or Mocha. Import `app` from `../server` and never call `listen()` in tests.
- Route handlers access data only through the functions exported by `db/store.js`, never by touching the `users` array directly.
- Return errors as JSON `{ error: "<message>" }` with the matching status: 400 for validation failures, 404 for missing resources.
- Unused `req`, `res`, `next` or `_` arguments are allowed by the lint config. Don't rename them to silence warnings.

## Architecture

- `server.js` builds the Express app, mounts one router per resource (`/users` → `routes/users.js`, `/health` → `routes/health.js`) and exports `app`. It only calls `listen()` when run directly (`require.main === module`), which lets the tests import the app without opening a port.
- `routes/` holds one `express.Router()` file per resource. To add a resource, create a new route file and mount it in `server.js`.
- `db/store.js` is an in-memory stand-in for a database. Its data resets on every restart, and state is shared across tests in the same process, so tests must not assume a fixed user count after a POST.
- Config comes from environment variables. `.env.example` documents them, and the real `.env` is git-ignored and must not be read or committed.
