# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

A small Express JSON REST API (users + health) that stores data in memory.

## Commands

- `npm run dev` — start the API with auto-reload on http://localhost:3000
- `npm test` — run the test suite (`node --test`)
- `npm run lint` — run ESLint
- Run one test file: `node --test tests/users.test.js`

## Conventions

- Read and write data only through `db/store.js`; never touch the `users` array directly from a route.
- Put HTTP logic (validation, status codes) in the route, not in the store; return JSON errors with `400` for bad input and `404` for a missing resource, like `routes/users.js`.
- Test by importing `app` with `supertest` (`require("../server")`); do not start a real server in tests.
- Use CommonJS `require`/`module.exports`, not ES module `import` — match the existing files.

## Architecture

- `server.js` is the entry point: it builds the Express `app`, mounts one router per resource (`/users`, `/health`), and only calls `listen()` when run directly, so tests can import the app without binding a port.
- `routes/` has one file per resource. Routes handle HTTP only and delegate all data access to the store.
- `db/store.js` is an in-memory stand-in for a database — it owns the data and exposes `getAllUsers` / `getUserById` / `createUser`. Data resets on every restart.
