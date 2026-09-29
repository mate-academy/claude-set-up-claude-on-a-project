# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

A small Express REST API (users + health check), backed by an in-memory store, used as a starter for the Claude Code course.

## Commands

- `npm run dev`: start the API with auto-reload at http://localhost:3000 (set `PORT` to change it)
- `npm test`: run all tests with Node's built-in runner (`node --test`)
- `node --test tests/users.test.js`: run one test file
- `node --test --test-name-pattern="404" tests/users.test.js`: run tests whose name matches
- `npm run lint`: ESLint (`eslint:recommended`). CI (Node 22) runs lint and then tests on every push/PR, so both must pass.

## Conventions

- Use CommonJS (`require` / `module.exports`), not ES modules. ESLint is configured with `sourceType: "script"`.
- Put one router file per resource in `routes/`, then mount it in `server.js` with `app.use("/<resource>", ...)`.
- Routes never touch data directly. They call functions exported from `db/store.js`, so add new data operations there.
- Send errors as JSON `{ error: "<message>" }` with the right status (400 for invalid input, 404 for not found). A successful create returns 201.
- Route params are strings. Convert them with `Number(req.params.id)` before a store lookup, because store IDs are numbers.
- Write tests with `node:test`, `node:assert`, and `supertest` against the exported `app`. Don't use Jest/Mocha, and don't start a real server in tests.

## Architecture

- `server.js` builds the Express app and exports it. It calls `app.listen` only when `require.main === module`, so tests can import `app` without binding a port. Keep that guard.
- `db/store.js` is an in-memory array that stands in for a database. Its data resets on restart, and it is shared module state across all tests in a process: tests that create users affect the ones that read them.
- `.env.example` documents config. Real values go in the git-ignored `.env`, which the app does not load automatically (there's no dotenv).
