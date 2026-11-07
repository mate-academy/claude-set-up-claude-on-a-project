# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

A small Express REST API (users and a health check) with an in-memory data store. It is the starter project for a Claude Code course.

## Commands

- `npm run dev`: start the API on http://localhost:3000, restarting on file changes (`node --watch`)
- `npm test`: run all tests with the built-in Node test runner (`node --test`)
- `node --test tests/users.test.js`: run a single test file
- `node --test --test-name-pattern="404"`: run only the tests whose names match a pattern
- `npm run lint`: run ESLint on the whole repo

CI (`.github/workflows/ci.yml`) runs `npm install`, `npm run lint` and `npm test` on Node 22 on every push and pull request. Both the lint and test steps must pass.

## Architecture

- `server.js` builds the Express app, mounts one router per resource (`/users`, `/health`) and exports `app`. It calls `listen()` only when run directly (`require.main === module`), which lets tests import `app` without opening a port. Keep that guard.
- `routes/<resource>.js`: each file exports an `express.Router()` and is mounted in `server.js`. A new resource needs both a new route file and a `app.use(...)` line in `server.js`.
- `db/store.js`: the only data access layer. It keeps data in module-level variables, so data resets whenever the server restarts and is shared by all tests in one run. Routes call store functions and never hold data themselves.
- `tests/*.test.js`: `node:test` plus `node:assert` plus `supertest` against the imported `app`. There is no Jest or Mocha.

## Conventions

- Use CommonJS (`require` / `module.exports`), not ES modules. ESLint is configured with `sourceType: "script"`.
- Report errors as JSON in the form `{ error: "<message>" }`, with the right status code: 400 for invalid input, 404 for a missing resource, 201 for a successful create. Use `return res.status(...).json(...)` so the handler stops there.
- Convert route params with `Number(req.params.id)` before calling the store, because ids are stored as numbers.
- Because store state is shared within a test run, tests must not depend on an exact user count or on ids that another test might create.
- Configuration comes from `process.env` only (`PORT`). Nothing loads `.env` automatically, because there is no `dotenv`.
- The course task is to set up Claude Code (`CLAUDE.md`, `.claude/settings.json`, `NOTES.md`). Do not change the app code unless asked.
