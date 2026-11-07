# CLAUDE.md

This project is a simple Express API for managing users and health checks.

## Commands
- `npm run dev`: Starts the API on http://localhost:3000.
- `npm test`: Runs the sample tests.
- `npm run lint`: Checks code style.

## Conventions
- Use named exports, never default exports.
- Keep route handlers in separate files under `routes/` (e.g., `users.js`, `health.js`).

## Architecture
- `server.js` is the entry point.
- Routes are defined in `routes/` (one file per resource).
- Data access is handled through `db/store.js` (in-memory helper).