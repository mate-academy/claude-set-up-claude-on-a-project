# CLAUDE.md

Express API that manages users, backed by an in-memory store (no real database).

## Commands
- `npm run dev` — start the API with auto-reload (http://localhost:3000)
- `npm test` — run the test suite
- `npm run lint` — check code style with ESLint

## Conventions
- Use `require`/`module.exports` (CommonJS), not `import`/`export`.
- Route handlers stay thin: validate input and call `db/store.js`, don't put data logic in `routes/`.
- Return errors as `{ error: "..." }` JSON with the appropriate status code, not thrown exceptions.

## Architecture
- `server.js` is the entry point: creates the Express app, mounts routes, starts the server.
- One route file per resource in `routes/` (e.g. `users.js`, `health.js`).
- All data access goes through `db/store.js`; routes never touch data directly.
