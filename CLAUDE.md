# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

A small Express REST API (users and a health check) with an in-memory data store. It's the starter project for the Claude Code course.

## Commands

- `npm install`: install dependencies
- `npm run dev`: start the API on http://localhost:3000 and restart on changes (`node --watch`)
- `npm test`: run all tests (`node --test`, the built-in Node test runner)
- `node --test tests/users.test.js`: run one test file
- `node --test --test-name-pattern="404" tests/users.test.js`: run the tests whose names match a pattern
- `npm run lint`: run ESLint (`eslint:recommended`). CI runs lint and then the tests on Node 22.

## Conventions

- Use CommonJS (`require` / `module.exports`), not ES modules. ESLint is set to `sourceType: "script"`.
- Routes must get and change data only through the functions in `db/store.js`. Don't touch the store's arrays directly from a route.
- Send errors as `res.status(<code>).json({ error: "<message>" })`, using `return` for early exits. For example: 400 for missing fields, 404 for a missing record.
- Write tests with `node:test`, `node:assert` and `supertest`, and import `app` from `../server`. Don't start a real server or use Jest or Mocha.
- Put a short `// METHOD /path — what it does` comment above each route handler.

## Architecture

- `server.js` builds the Express app, mounts each router under its path (`/users`, `/health`) and exports `app`. It only calls `listen()` when run directly (`require.main === module`), which is what lets the tests import it.
- `routes/` has one `express.Router()` file per resource. A new resource gets its own `routes/<name>.js`, mounted in `server.js`.
- `db/store.js` stands in for a database. It's module-level in-memory state and resets on every restart. Tests share this state within a run, so a test that creates a user changes what later tests see.
- Config comes from environment variables (currently just `PORT`). `.env.example` documents them. `.env` is git-ignored and must not be read or committed.
