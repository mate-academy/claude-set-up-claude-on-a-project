# claude-course-starter

A small in-memory Express API (users + health endpoints) used as a course sandbox.

## Commands

- `npm run dev` — start the API on http://localhost:3000 (auto-restarts on change)
- `npm test` — run the tests in `tests/`
- `npm run lint` — check code style with ESLint

## Conventions

- Access data only through `db/store.js` — don't reach into the `users` array from routes.
- One route file per resource in `routes/` (see `users.js`, `health.js`); new resources follow the same pattern.
- Use `require`/`module.exports` (CommonJS), not ESM `import`/`export`.

## Architecture

- `server.js` is the entry point: builds the Express app, mounts routers, starts listening.
- Each resource gets its own router under `routes/`, mounted in `server.js`.
- `db/store.js` is a tiny in-memory data helper standing in for a real database — data resets on restart.
