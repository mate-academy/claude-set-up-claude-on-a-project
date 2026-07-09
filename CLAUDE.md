# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

Starter Express API for the Claude Code course, with the required scaffoling in place: the app code
(`server.js`, `routes/`, `db/`, `tests/`). 

## Commands

```
npm install       # install dependencies
npm run dev        # start the API on http://localhost:3000 (node --watch, auto-restarts)
npm start          # start without watch mode
npm test           # run all tests (node:test)
npm run lint       # eslint .
```

Run a single test file: `node --test tests/users.test.js`

CI (`.github/workflows/`) runs `npm install`, `npm run lint`, and `npm test` on every push and PR.

## Architecture

- `server.js` — entry point. Builds the Express `app`, mounts route modules, and only calls
  `app.listen` when run directly (`require.main === module`). Tests import `app` from this file
  without starting a real server (see `tests/users.test.js`).
- `routes/` — one file per resource (`users.js`, `health.js`), each exporting an `express.Router()`
  mounted in `server.js` under its resource path (`/users`, `/health`).
- `db/store.js` — in-memory data access layer standing in for a real database. State resets on every
  restart; routes call into this module rather than touching data directly.
- `tests/` — integration tests using `supertest` against the exported `app`, run with Node's built-in
  `node:test` runner (no external test framework).

## Conventions

- Route handlers validate input and return JSON error bodies (`{ error: "..." }`) with the appropriate
  status code (400, 404) rather than throwing.
- New resources should follow the existing pattern: a router in `routes/`, mounted in `server.js`, with
  data access delegated to `db/store.js` (or an equivalent store module).
- Time: hh:mm, and dates: dd.mm.yyyy
