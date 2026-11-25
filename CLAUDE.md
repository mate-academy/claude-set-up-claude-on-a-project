# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

A small Express 4 JSON API with in-memory user data, used as a practice project for the Claude Code course.

## Commands

```
npm install            # install dependencies (Node 22 is used in CI)
npm run dev            # start the API with --watch on http://localhost:3000 (PORT env overrides)
npm start              # start the API without watch
npm test               # run all tests (node:test + supertest)
npm run lint           # eslint . (eslint:recommended, Node/ES2022 env)
```

Run a single test by name (filters on the test title):

```
node --test --test-name-pattern="GET /health" tests/users.test.js
```

CI (`.github/workflows/ci.yml`) runs `npm install`, `npm run lint`, then `npm test`. Run lint and tests before committing.

## Architecture

- **Entry point:** `server.js` builds the Express `app`, mounts the routers at `/users` and `/health`, and exports `app`. It listens on a port only when run directly (`require.main === module`).
- **Routes:** one file per resource in `routes/`, each exporting an `express.Router()`. Register new routers in `server.js`.
- **Data:** `db/store.js` keeps the users array in memory and exposes `getAllUsers`, `getUserById`, and `createUser`. Data resets on every restart.
- **Tests:** `tests/*.test.js` use `node:test` and `assert` with `supertest` against the exported `app`. The store is shared module state, so tests that create users affect later tests.

## Conventions

- Use `store` functions for data access, not the users array directly.
- Use `supertest` against the exported `app` in tests, not a real port or `server.listen`.
- Use `process.env.PORT`, not a hardcoded port number.
- Return errors as `{ error: "..." }`: `400` for missing required fields, `404` for unknown IDs.
- For unused function parameters, name them `_`, `req`, `res`, or `next` (ESLint ignores those).
- Keep secrets in `.env` (git-ignored), not in code.
