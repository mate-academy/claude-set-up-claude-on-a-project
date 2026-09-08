# Express Demo API

A lightweight Express REST API demonstrating user and health endpoints with an in-memory datastore.

## Commands
- `npm run dev`: Start API server on http://localhost:3000 with auto-reload
- `npm test`: Run the test suite via Node's native test runner
- `npm run lint`: Check code style and formatting rules

## Conventions
- Use modular route files under `routes/` (one file per resource), not a monolithic router in `server.js`.
- Access data exclusively through `db/store.js` methods; do not mutate global state directly.
- Return standard JSON responses with explicit HTTP status codes (`res.status(...).json(...)`).

## Architecture
- `server.js`: Application entry point; initializes middleware and registers route handlers.
- `routes/`: Route modules (`users.js`, `health.js`) handling request validation and responses.
- `db/store.js`: In-memory persistence layer simulating database operations.
