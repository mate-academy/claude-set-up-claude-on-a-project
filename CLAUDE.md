# Project

Small Express REST API for users and health checks, built for a Claude Code course. Data is stored in memory and resets when the server restarts.

## Commands

- `npm run dev`: start the API with auto-reload on port 3000, unless PORT overrides it.
- `npm test`: run the test suite.
- `npm run lint`: check code style.

## Conventions

- Use CommonJS (`require` / `module.exports`), not ES modules.
- Use double quotes and semicolons.
- Return errors as JSON `{ error: "<message>" }`: 400 for invalid input and 404 for missing resources. Successful creation returns 201.
- Use the existing `node:test` and `supertest` setup; do not add another test framework.
- Never read or print `.env`; use `.env.example` for configuration documentation.

## Architecture

- `server.js` is the API entry point. Running it directly starts the API server. It creates and exports the Express app and mounts the routers. Keep the `require.main === module` guard so importing the app does not start the server.
- `routes/` contains one router file per resource.
- `db/store.js` handles all data access. Routes must call its functions rather than manipulate stored data directly.
- `tests/users.test.js` tests the API. Tests must account for the shared in-memory store and must not depend on execution order.
