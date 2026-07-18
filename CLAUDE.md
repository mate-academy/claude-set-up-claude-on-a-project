# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

A small Express REST API (users + health check) used as the starter project for the Claude Code course. It exists as a realistic codebase to practice setting up Claude Code on — the app itself is intentionally minimal.

## Commands

- `npm run dev` — start the API with file watching on http://localhost:3000
- `npm test` — run the test suite (Node's built-in `node --test` runner)
- `npm run lint` — check code style with ESLint
- Run a single test file: `node --test tests/users.test.js`

## Architecture

- `server.js` is the entry point. It builds the Express `app`, mounts routers, and only calls `app.listen` when run directly (`require.main === module`) so tests can `require("../server")` and hit the app without opening a port. It exports `app`.
- One router file per resource in `routes/` (`users.js`, `health.js`), each mounted under its own path prefix in `server.js`.
- All data access goes through `db/store.js` — an in-memory store standing in for a database. Data resets on every restart. Route handlers must not hold their own state; add data operations to `store.js`.
- Tests use `supertest` against the imported `app` (no live server) with Node's `node:test` and `node:assert`.

## Conventions

- CommonJS modules (`require` / `module.exports`), not ESM — `.eslintrc.json` sets `sourceType: "script"`.
- Use double quotes and semicolons, matching existing files.
- Unused `req`, `res`, `next`, and `_`-prefixed args are allowed by lint; other unused vars warn.
