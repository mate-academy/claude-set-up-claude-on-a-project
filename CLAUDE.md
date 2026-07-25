# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

A small Express REST API (users + health) used as the starter project for the Claude Code course. Data lives in an in-memory store, so there is no database to set up.

## Commands

```bash
npm install            # install dependencies
npm run dev            # start the API on http://localhost:3000 with --watch (auto-restart)
npm start              # start the API without watch
npm test               # run all tests (node --test)
node --test tests/users.test.js   # run a single test file
npm run lint           # eslint
```

CI (`.github/workflows/ci.yml`) runs `npm run lint` then `npm test` on every push and pull request, so both must pass before merging.

## Architecture

- `server.js` is the entry point. It builds the Express `app`, mounts each router under its path prefix, and only calls `app.listen` when the file is run directly (`require.main === module`). It also `module.exports = app` so tests can import the app without opening a port — preserve this pattern when editing.
- `routes/` holds one router file per resource (`users.js`, `health.js`). Each exports an `express.Router()` and is mounted in `server.js`. Add a new resource by creating a router here and mounting it there.
- `db/store.js` is the only data layer — a tiny in-memory array with `getAllUsers` / `getUserById` / `createUser`. Route handlers must go through this module rather than touching data directly. Data resets on every restart.
- `images/` holds the necessary image files

## Conventions

- CommonJS only (`require` / `module.exports`); ESLint is configured with `sourceType: "script"`, so do not use `import`/`export`.
- Validate input in the route handler and return the documented status codes: `400` for missing required fields, `404` for a missing resource, `201` on create.
- Unused-argument lint rule ignores `req`, `res`, `next`, and names starting with `_`; name intentionally-unused params accordingly.
- Tests use the built-in `node:test` runner with `node:assert` and `supertest` against the imported `app` — no separate test framework.
