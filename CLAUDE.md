# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

Starter Express API used for the Claude Code course.

## Commands

- `npm run dev` — start the API with auto-reload on `http://localhost:3000`
- `npm test` — run the test suite (Node's built-in test runner + supertest)
- `npm run lint` — run ESLint

To run a single test file: `node --test tests/users.test.js`

## Conventions

- Route handlers live one file per resource under `routes/` (`users.js`, `health.js`) and are mounted in `server.js` — new resources follow the same pattern.
- All data access goes through `db/store.js`, not direct manipulation of arrays/objects in route files.
- Unused-parameter lint warnings are suppressed for `req`, `res`, `next`, and `_`-prefixed names (see `.eslintrc.json`).

## Architecture

- `server.js` is the entry point: builds the Express app, mounts routers, and only calls `app.listen` when run directly (`require.main === module`) so tests can import `app` without opening a real port.
- `db/store.js` is an in-memory data store (resets on restart) standing in for a real database.
