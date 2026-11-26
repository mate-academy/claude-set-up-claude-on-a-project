# Project Overview
A lightweight Express.js REST API for managing users with an in-memory data store.

## Commands
- `npm run dev` — start the API server on `http://localhost:3000`
- `npm test` — run the test suite
- `npm run lint` — check code style with ESLint

## Conventions
- Keep one route file per resource inside `routes/` instead of putting route handlers directly in `server.js`.
- Access and modify data exclusively through `db/store.js` helpers rather than mutating state directly in routes.
- Follow existing ESLint rules (run `npm run lint` before finishing changes).

## Architecture
- `server.js` — application entry point that initializes Express and mounts routers.
- `routes/` — HTTP route handlers split by resource (`users.js`, `health.js`).
- `db/store.js` — in-memory data helper encapsulating data storage operations.
- `tests/` — automated API tests (`users.test.js`).
