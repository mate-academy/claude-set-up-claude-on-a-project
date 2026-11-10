# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

A small Express (Node.js, CommonJS) REST API for users. It serves as the starter repo for the Claude Code course.

## Commands

- `npm run dev`: start the API on http://localhost:3000 with `node --watch` (set `PORT` to change the port)
- `npm test`: run all tests with Node's built-in runner (`node --test`)
- `node --test tests/users.test.js`: run a single test file
- `node --test --test-name-pattern="404" tests/users.test.js`: run tests whose names match a pattern
- `npm run lint`: run ESLint (`eslint:recommended`, ESLint 8 with `.eslintrc.json`)

CI (`.github/workflows/ci.yml`) runs `npm run lint` and then `npm test` on Node 22. Both must pass.

## Conventions

- Use CommonJS (`require` / `module.exports`), not ES modules. ESLint uses `sourceType: "script"`.
- Write tests with `node:test` and `node:assert`, and use `supertest` against the exported `app`. Don't add Jest or Mocha.
- Routes never touch data directly. They go through functions exported from `db/store.js`.
- Send errors as JSON in the form `{ error: "<message>" }` with the right status code (400 for validation, 404 for not found). Send 201 on create.
- Route params arrive as strings. Convert IDs with `Number(req.params.id)` before you look them up, because the store compares with `===`.

## Architecture

- `server.js` builds the Express app, mounts each router under its path prefix, and exports `app`. It only calls `listen()` when run directly (`require.main === module`), so tests can import `app` without opening a port.
- `routes/` has one `express.Router()` file per resource (`users.js` → `/users`, `health.js` → `/health`). To add a resource, create a router file here and mount it in `server.js`.
- `db/store.js` is an in-memory store that stands in for a database. Its state lives at module level, so it resets on restart and is **shared across all tests in a file**. Tests that create users change what later tests see.
- `.env.example` documents the config. The real `.env` must never be read or committed.