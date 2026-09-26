# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

A small Express REST API (`/users`, `/health`) backed by an in-memory store — the practice codebase for the Claude Code course.

This repo is a course exercise: the deliverables are `CLAUDE.md`, `.claude/settings.json`, and `NOTES.md`. **Do not change the app code** unless asked directly.

## Commands

- `npm install` — required first; `node_modules/` is not checked in
- `npm run dev` — start with auto-reload (`node --watch`) on http://localhost:3000
- `npm test` — run the suite
- `npm run lint` — ESLint

Tests use **Node's built-in runner** (`node:test` + `node:assert`), not Jest or Mocha:

- single file: `node --test tests/users.test.js`
- single test by name: `node --test --test-name-pattern="GET /health returns ok"`

## Conventions

- **CommonJS only** — `require` / `module.exports`. ESLint is configured with `sourceType: "script"` and will error on `import` / `export`.
- **Match the existing style by hand: double quotes, semicolons, 2-space indent, trailing commas in multiline literals.** ESLint here extends only `eslint:recommended` and defines no stylistic rules, so nothing enforces or auto-fixes this.
- All data access goes through `db/store.js`. Routes call its exported functions and never touch the `users` array directly.
- Validate inside the route handler and return the status directly: `400` for missing or invalid input, `404` for a record that doesn't exist, `201` on create.
- Unused Express handler args are allowed — `no-unused-vars` ignores `req`, `res`, `next`, and any `_`-prefixed name.

## Architecture

- `server.js` — entry point. Creates the app, registers `express.json()`, and mounts each router under its path. A new route file is unreachable until it's mounted here.
- `routes/` — one file per resource, each exporting an `express.Router()`.
- `db/store.js` — in-memory array plus accessor functions. Data resets on every restart.

Two things that look incidental but aren't:

- `app.listen()` is wrapped in `if (require.main === module)` so tests can `require("../server")` without binding a port. Removing the guard breaks the suite.
- `getAllUsers()` returns the live array reference, and the store is module-level state shared across every test in a process. Tests must not assume an exact user count or ordering.

## CI

`.github/workflows/ci.yml` runs on every push and pull request (all branches): `npm install`, then `npm run lint`, then `npm test`. Lint runs first, so a lint error blocks the test signal.
