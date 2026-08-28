# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

A minimal Express REST API (course starter project) with in-memory data storage — no database, no auth, no build step. It's importante to highlight that this is a learning project and I won't be touching the code.

## Commands

- `npm install` — install dependencies
- `npm run dev` — start the API on http://localhost:3000 with auto-reload (`node --watch`)
- `npm start` — start the API without auto-reload
- `npm test` — run all tests (Node's built-in test runner)
- `node --test tests/users.test.js` — run a single test file
- `npm run lint` — run ESLint

CI (`.github/workflows/ci.yml`) runs `npm install`, `npm run lint`, and `npm test` on every push and PR.

## Architecture

- `server.js` — Express app entry point. Mounts each resource's router under its path (e.g. `/users`, `/health`) and only calls `app.listen` when run directly, so `tests/` can `require("../server")` and exercise the app in-process via `supertest` without a real port.
- `routes/` — one router file per resource (`users.js`, `health.js`). Routes handle HTTP concerns (params, status codes, validation) and delegate data access to `db/store.js`.
- `db/store.js` — in-memory data store standing in for a real database. State resets on every server restart; do not expect persistence.
- `tests/` — integration tests using Node's built-in `test`/`assert` modules plus `supertest` against the exported `app`.

## Conventions

- CommonJS throughout (`require`/`module.exports`), not ESM.
- Routes never touch the data array directly — all reads/writes go through the exported functions in `db/store.js`.
- Config comes from environment variables with sane defaults (see `PORT` in `server.js`); real secrets belong in a git-ignored `.env`, never committed (`.env.example` documents the shape).
