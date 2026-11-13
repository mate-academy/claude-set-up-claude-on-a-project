# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

A small Express REST API for users, plus a health check, backed by an in-memory store.

## Commands

- `npm run dev`: start the API on http://localhost:3000 with `node --watch`. Set the port with `PORT`.
- `npm test`: run all tests with Node's built-in runner (`node --test`).
- `node --test tests/users.test.js`: run one test file.
- `node --test --test-name-pattern="404" tests/`: run the tests whose names match a pattern.
- `npm run lint`: run ESLint on the whole repo.

CI (`.github/workflows/ci.yml`) runs `npm run lint` and then `npm test` on Node 22. Both must pass.

## Conventions

- Use CommonJS (`require` / `module.exports`), not ES modules. ESLint uses `sourceType: "script"`.
- Write tests with `node:test`, `node:assert`, and `supertest` against the exported `app`. Don't use Jest or Mocha, and don't start a real server in tests.
- Route handlers access data only through functions exported from `db/store.js`. Never touch the `users` array directly from a route.
- Send errors as JSON, `{ error: "<message>" }`, with the right status code: 400 for invalid input, 404 when something isn't found. A successful create returns 201.
- Don't read or edit `.env`. Configuration comes from environment variables, and `.env.example` documents them.

## Architecture

- `server.js` builds the Express app, mounts each router under its resource path (`/users`, `/health`), and exports `app`. It calls `listen()` only when `require.main === module`, so tests can import the app without opening a port.
- `routes/` holds one `express.Router` file per resource. To add a resource, create `routes/<name>.js` and mount it in `server.js`.
- `db/store.js` is an in-memory stand-in for a database. Its data resets on every restart, and state persists between tests that run in the same process.
