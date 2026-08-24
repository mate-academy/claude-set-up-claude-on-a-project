# Express User Management API

Simple REST API built with Express.js for managing users and system health.

## Commands
- Run dev server: `npm run dev`
- Run tests: `npm test`
- Run linter: `npm run lint`

## Conventions
- Use Express `Router` instances for all API routes inside `routes/`.
- Handle data persistence exclusively through `db/store.js` using asynchronous patterns.

## Architecture
- `server.js` — Entry point that initializes Express app and mounts routes.
- `routes/` — Modular router modules, one file per domain resource (e.g., `users.js`, `health.js`).
- `db/store.js` — In-memory data store abstraction.
- `tests/` — Jest/Supertest integration tests.