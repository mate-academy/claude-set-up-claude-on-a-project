# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

A small Express REST API (users + health check) with an in-memory data store, used as the starter project for a Claude Code course.

## Commands

```sh
npm run dev                          # start the API on http://localhost:3000, restarts on file changes
npm test                             # run all tests
npm run lint                         # ESLint over the whole repo
node --test tests/users.test.js      # run one test file
```

CI runs `npm run lint` then `npm test` on Node 22 for every push and PR, so both must pass before you finish a change.

## Conventions

- Use CommonJS (`require` / `module.exports`), not ES modules (`import` / `export`). ESLint is set to `sourceType: "script"`.
- Use the built-in `node:test` and `node:assert` with `supertest` for tests, not Jest or Mocha. Put tests in `tests/` and name them `*.test.js`.
- Call functions from `db/store.js` in routes; don't read or change the data arrays directly.
- Return errors as JSON `{ "error": "<message>" }` with 400 for bad input and 404 for missing records, not as plain text.
- Don't read or print `.env`; `.env.example` lists the available config.

## Architecture

- `server.js` is the entry point. It creates the Express app, mounts each router (`/users`, `/health`), and exports `app`. It only calls `listen()` when run directly (`require.main === module`), so tests can import `app` without opening a port. Keep that guard.
- `routes/` has one router file per resource. A new resource needs its own file plus an `app.use("/<resource>", ...)` line in `server.js`.
- `db/store.js` handles all data access. It holds the data in memory, so everything resets on restart, and tests share state (a `POST` in one test is visible to the tests after it).
