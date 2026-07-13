# CLAUDE.md

Express API with in-memory data (no database), covering users and health-check endpoints.

## Commands

- `npm run dev` — start the API with auto-reload on http://localhost:3000
- `npm test` — run the tests (`node --test`)
- `npm run lint` — check code style with ESLint

## Conventions

- Use double quotes and `require`/`module.exports` (CommonJS), not `import`/`export`.
- One route file per resource under `routes/`, mounted in `server.js` — don't add routes directly to `server.js`.
- All data access goes through `db/store.js`; don't mutate the in-memory `users` array from route handlers.

## Architecture

- `server.js` is the entry point: builds the Express app, mounts `routes/`, and only calls `app.listen` when run directly (so tests can `require` the app without opening a port).
- `routes/` holds one file per resource (`users.js`, `health.js`).
- `db/store.js` is a tiny in-memory data helper standing in for a real database; data resets on restart.
