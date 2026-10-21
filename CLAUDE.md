# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

A small Express 4 REST API for users, backed by an in-memory store. It is the starter repo for a Claude Code course.

## Commands

- `npm run dev`: start the API on http://localhost:3000 and restart it on file changes (`node --watch`)
- `npm test`: run all tests with Node's built-in runner (`node --test`)
- `node --test --test-name-pattern="404" tests/users.test.js`: run a single test by name
- `npm run lint`: run ESLint (CI runs lint and test on Node 22 and fails on either)

## Conventions

- Use CommonJS (`require` / `module.exports`), not ES modules. ESLint is set to `sourceType: "script"`.
- Write tests with `node:test` + `node:assert` + `supertest`, not Jest or Mocha. Import `app` from `../server` and call `request(app)`; never start a real server in tests.
- Return errors as JSON `{ error: "<message>" }` with the right status (400 for invalid input, 404 for missing resources), as `routes/users.js` does.
- Routes never touch data directly. All reads and writes go through functions exported from `db/store.js`.

## Architecture

- `server.js` builds the Express app, mounts one router per resource (`/users`, `/health`) and exports `app`. It only calls `listen` when run directly (`require.main === module`), which is how the tests can import it.
- `routes/<resource>.js`: one `express.Router()` per resource. To add a resource, create a new route file and mount it in `server.js`.
- `db/store.js`: module-level arrays stand in for a database. Nothing is saved: data resets when the process restarts, and state is shared across tests in the same process. Route params arrive as strings, so convert them (`Number(req.params.id)`) before looking them up in the store.
- Config comes from environment variables (`PORT`). `.env.example` is the template, and the real `.env` is git-ignored.
