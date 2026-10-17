# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

A small Express API (users and health endpoints) with an in-memory store. It serves as the starter project for a Claude Code course.

## Commands

- `npm run dev`: start the API with `node --watch` on `http://localhost:3000` (set `PORT` to change it)
- `npm test`: run all tests with the built-in Node test runner (`node --test`)
- `node --test tests/users.test.js`: run one test file
- `node --test --test-name-pattern="POST /users"`: run the tests whose names match
- `npm run lint`: ESLint (`eslint:recommended`)
- `npm help` - give me help on the npm command

CI (`.github/workflows/ci.yml`) runs `npm install`, then `npm run lint`, then `npm test` on Node 22. Changes must pass both lint and tests.

## Architecture

- `server.js` builds the Express `app`, mounts each router at its own path (`/users`, `/health`) and exports `app`. It calls `listen` only when run directly (`require.main === module`), so tests can import `app` without opening a port.
- `routes/`: one file per resource. Each file exports an `express.Router()` and is mounted in `server.js`.
- `db/store.js`: the only data-access layer. It holds a module-level array that resets on restart and is shared by every request and every test in the same process.

## Conventions

- Use CommonJS (`require` / `module.exports`), not ES modules. ESLint is configured with `sourceType: "script"`.
- Routes never touch data directly. They call functions in `db/store.js`, so add a store function before adding a route that needs new data access.
- Error responses use the shape `res.status(<code>).json({ error: "<message>" })`, with 400 for validation failures and 404 for missing resources.
- Tests use `node:test` + `node:assert` + `supertest` against the exported `app`. Don't add Jest or Mocha.
- Tests share store state, so don't write assertions that depend on exact user counts or IDs.
- Unused `req`, `res`, `next` and `_` arguments are allowed by the lint config, so keep the standard handler signatures.
