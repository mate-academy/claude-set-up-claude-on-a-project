# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

A small Express REST API for users, backed by an in-memory store; the starter project for the Claude Code course.

## Commands

- `npm install`: install dependencies; run this first on a fresh clone, or `npm test` and `npm run lint` will fail
- `npm run dev`: start the API with auto-restart on http://localhost:3000
- `npm test`: run all tests with Node's built-in runner
- `node --test tests/users.test.js`: run one test file
- `node --test --test-name-pattern="GET /health" tests/users.test.js`: run tests whose name matches
- `npm run lint`: run ESLint; CI runs lint, then tests, on Node 22 for every push and PR

## Conventions

- Use CommonJS (`require` / `module.exports`), not ES modules; ESLint parses files as scripts, so `import` fails lint.
- Write tests with `node:test`, `node:assert`, and `supertest`, not Jest or Mocha, and put them in `tests/*.test.js`.
- Return API errors as `{ "error": "<message>" }` with a matching status code.
- Access data only through functions exported by `db/store.js`; add a new store function instead of touching its data from a route.

## Architecture

- `server.js` builds the app, mounts each router, and exports `app`. Keep the `require.main === module` guard around `listen`, because tests import `app` without opening a port.
- `routes/` has one Express router per resource. A new resource needs its own file and an `app.use` mount in `server.js`.
- `db/store.js` holds state in module variables. Data resets on restart and persists between tests in the same file, so tests must not assume a pristine store after a `POST`. Store getters return live references, so copy results before sorting or changing them in a route.
- Nothing loads `.env` automatically: `PORT` comes from the real process environment and defaults to 3000.
