# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

Small Express REST API (users + health check), used as the starter repo for a Claude Code course.

## Commands

- `npm run dev` — start API on http://localhost:3000 with `node --watch` (port via `PORT` env var)
- `npm test` — run all tests (`node --test`, auto-discovers `*.test.js`)
- `node --test --test-name-pattern="404" tests/users.test.js` — run a single test by name
- `npm run lint` — ESLint (`eslint:recommended`); CI runs lint then test on Node 22, both must pass

## Conventions

- CommonJS only: `require` / `module.exports`, not `import` / `export` (ESLint `sourceType: "script"`).
- Tests use built-in `node:test` + `node:assert` with `supertest`, not Jest/Mocha. Import `app` from `../server` and call `request(app)` — never start a real server in tests.
- Routes never touch data directly; all reads/writes go through functions exported from `db/store.js`.
- Error responses are JSON `{ error: "<message>" }` with the matching status (400 validation, 404 not found).
- Don't add dependencies for things Node or Express already provide.

## Architecture

- `server.js` builds the Express app, mounts one router per resource (`/users` → `routes/users.js`, `/health` → `routes/health.js`), and exports `app`. It only calls `listen` under `require.main === module`, so tests can import it without binding a port.
- New resource = new file in `routes/` exporting an `express.Router()`, mounted in `server.js`.
- `db/store.js` is an in-memory module-level array standing in for a database: data resets on restart, ids are numeric (routes convert `req.params.id` with `Number()`), and state is shared across all tests in a run — tests that create users affect later ones.
