# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

A small Express (CommonJS) REST API for users, with an in-memory data store. It is the starter project for the Claude Code course.

## Commands

- `npm run dev`: start the API with `node --watch` on `http://localhost:3000` (port from `PORT`)
- `npm test`: run all tests with the built-in `node:test` runner
- `node --test --test-name-pattern="404" tests/users.test.js`: run a single test by name
- `npm run lint`: ESLint (`eslint:recommended`, ES2022). CI on Node 22 runs `npm run lint` then `npm test` on every push and PR, so both must pass.

## Architecture

- `server.js` builds the Express app, mounts one router per resource (`/users`, `/health`) and exports `app`. It only calls `listen()` when run directly (`require.main === module`).
- `routes/<resource>.js` holds one `express.Router()` per resource. Register each new router in `server.js`.
- `db/store.js` is the only data layer: plain functions over an in-memory array. Data resets on every restart.
- `tests/*.test.js` import `app` from `server.js` and call it through `supertest`, without opening a port.

## Conventions

- Use CommonJS (`require` / `module.exports`), not ES modules. ESLint is set to `sourceType: "script"`.
- Routes access data only through functions exported from `db/store.js`. They never touch the `users` array directly. Add new data operations to the store.
- Return errors as JSON `{ "error": "<message>" }` with the matching status (400 for invalid input, 404 for not found). Return 201 with the created object on POST.
- Write tests with `node:test` and `node:assert`, not Jest or Mocha.
- Never read or commit `.env`. Config examples go in `.env.example`.
