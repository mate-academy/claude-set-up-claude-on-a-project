# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

Starter Express 4 REST API (users + health endpoints, in-memory data) used as the base project for the Claude Code course.

## Commands

- `npm run dev` — start the API with auto-reload on http://localhost:3000 (`PORT` overrides).
- `npm test` — run all tests with the built-in Node runner (`node --test`).
- `npm run lint` — ESLint over the whole repo; CI runs lint then tests, so both must pass.
- Single test: `node --test --test-name-pattern="GET /health" tests/users.test.js`

## Conventions

- CommonJS only: use `require` / `module.exports`, not `import` / `export` (ESLint is configured with `sourceType: "script"`).
- Tests use `node:test` + `node:assert` + `supertest`, not Jest or Mocha. Import `app` from `../server`; never call `app.listen` in tests.
- Return errors as `res.status(<400|404>).json({ error: "<message>" })`, not plain text or thrown errors.
- Convert route params with `Number(req.params.id)` before calling the store; store ids are numbers.
- Routes call `db/store.js` functions, not its data directly.

## Architecture

- `server.js` is the entry point: it builds the Express `app`, mounts `express.json()` and each router, and exports `app`. It only calls `listen` when run directly (`require.main === module`), which is what lets tests import it. Keep that guard.
- `routes/` holds one Router file per resource (`users.js`, `health.js`). A new resource means a new file there plus an `app.use("/<name>", ...)` line in `server.js`.
- `db/store.js` is the only data access layer: an in-memory store held in module-level state, shared across requests and tests, reset on restart.
