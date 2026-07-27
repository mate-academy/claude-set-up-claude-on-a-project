# CLAUDE.md
A small Express API for managing users, backed by an in-memory data store.

## Commands

- `npm run dev` — start the API with auto-reload 
- `npm test` — run tests; run a single file with `node --test tests/users.test.js`
- `npm run lint` — run ESLint

## Architecture

- `server.js` — Express app entry point; mounts route modules and only calls `app.listen` when run directly (not when imported by tests)
- `routes/` — one file per resource (`users.js`, `health.js`), mounted under its resource path in `server.js`
- `db/store.js` — in-memory data access layer; all data access goes through this module rather than routes touching state directly. Data resets on every restart.

## Conventions

- Config comes from environment variables (see `.env.example`), never hardcoded; `.env` is git-ignored.
- Route handlers validate input and return JSON error bodies (`{ error: "..." }`) with appropriate status codes rather than throwing.