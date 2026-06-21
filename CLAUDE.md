# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this project is

A minimal Express REST API used as a course starter. It exposes `/users` (GET list, GET by id, POST) and `/health` (GET). Data lives in memory — nothing is persisted across restarts.

## Commands

```bash
npm run dev   # start the API in watch mode (restarts on file change)
npm test      # run all tests with Node's built-in test runner
npm run lint  # check code style with ESLint
```

To run a single test file: `node --test tests/users.test.js`

## Architecture

- `server.js` — creates the Express app, mounts route files, and exports `app`. Only binds to a port when run directly (so tests can import `app` without opening a real port).
- `routes/` — one file per resource; each file creates an `express.Router` and exports it.
- `db/store.js` — the only place that touches data. Routes call its functions (`getAllUsers`, `getUserById`, `createUser`); they never manipulate the array directly.

## Conventions

- All data access goes through `db/store.js` — routes never touch the data array directly.
- Route files use `express.Router` and are mounted in `server.js` under a path prefix.
- Tests use Node's built-in `node:test` + `assert` + supertest; import `app` from `server.js`.
- ESLint is set to `eslint:recommended`; `req`, `res`, `next`, and `_`-prefixed args are exempt from the unused-vars warning.
- Config (e.g. `PORT`) comes from environment variables with defaults in code; real values go in `.env` (git-ignored, modelled by `.env.example`).
