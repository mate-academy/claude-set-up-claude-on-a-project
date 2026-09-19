# Express API Service

A simple Express.js REST API providing user management endpoints and health checks.

## Commands
- `npm run dev` — Start the development server with hot-reload
- `npm test` — Run unit tests with Jest
- `npm run lint` — Check code style with ESLint

## Conventions
- Use ES modules syntax (`import`/`export`) for all backend files.
- Keep route handlers simple and delegate data operations to `db/store.js`.

## Architecture
- `server.js` — Main entry point that initialises Express and registers routes.
- `routes/` — Contains endpoint handlers (`users.js`, `health.js`), one file per resource.
- `db/store.js` — In-memory data store helper.
- `tests/` — Jest test files mirror route structure (`users.test.js`).
