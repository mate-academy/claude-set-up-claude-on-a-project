# CLAUDE.md

A simple Express API with in-memory user data and health-check endpoints.

## Commands

* `npm run dev` — Start the API with hot reload on port 5000 (or `PORT` from `.env`).
* `npm test` — Run all tests with Node's built-in test runner.
* `npm run lint` — Check code style with ESLint.

## Conventions

* Use one router file per resource in `routes/`; keep all endpoints for that resource in its router.
* Access user data only through functions in `db/store.js`; never access the data store directly from routes.
* Use Node's built-in `test` module with `supertest` for HTTP integration tests.
* Import `app` from `server.js` in tests; do not start the server in test files.

## Architecture

* `server.js` is the entry point. It creates the Express app, loads environment variables, mounts routers, and starts the server when run directly.
* `routes/` contains one Express router per resource, mounted by `server.js`.
* `db/store.js` contains the in-memory data and all data-access functions.
* `tests/` contains HTTP integration tests matching the corresponding resource routes.
