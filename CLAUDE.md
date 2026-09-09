# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this project is

A minimal Express REST API used as a starter for the Claude Code course. It exposes two resources: `/users` (CRUD) and `/health` (liveness check). Data is held in memory and resets on restart — there is no database.

## Commands

```bash
npm run dev   # start the API with file-watching on http://localhost:3000
npm test      # run all tests (Node built-in test runner)
npm run lint  # check code style with ESLint
```

To run a single test file: `node --test tests/users.test.js`

## Architecture

- `server.js` — creates the Express app, mounts routes, exports `app` for tests; only binds a port when run directly
- `routes/` — one file per resource (`users.js`, `health.js`); each file exports a Router
- `db/store.js` — the sole data-access layer; all routes go through it, never touching the `users` array directly
- `tests/` — integration tests using `supertest` against the exported `app`; no mocking

## Conventions

- All data access goes through `db/store.js` — routes must not read or mutate the store's internal state directly.
- One route file per resource in `routes/`; do not put multiple resources in one file.
- `app` is exported from `server.js` so tests can import it without starting a server.
- Environment config via `process.env` only; copy `.env.example` to `.env` for local overrides.
