# claude-course-starter

Express API with in-memory user storage (no database) — a `/health` check and CRUD-style `/users` endpoints.

## Commands
- `npm run dev` — start the API on http://localhost:3000 (auto-restarts on change)
- `npm test` — run the test suite (`node --test`)
- `npm run lint` — check code style with ESLint

## Conventions
- One route file per resource in `routes/` (e.g. `users.js`, `health.js`) — don't add routes directly in `server.js`.
- All data access goes through `db/store.js`, never touch the in-memory arrays directly from a route.
- Use double quotes and semicolons (matches existing files), not single quotes.

## Architecture
- `server.js` — entry point; mounts routers and starts the server only when run directly (so tests can `require` the app without opening a port).
- `routes/` — one Express router per resource.
- `db/store.js` — tiny in-memory data store; resets on every restart, not a real database.
