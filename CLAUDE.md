# claude-course-starter

A small Express API that serves a `/users` resource and a `/health` check, backed by an in-memory store.

## Commands

- `npm run dev` — start the API with auto-reload on http://localhost:3000
- `npm test` — run the test suite (`node --test`)
- `npm run lint` — check code style with ESLint

## Conventions

- Use CommonJS (`require`/`module.exports`), not ESM `import`/`export` — matches the rest of the codebase.
- One route file per resource under `routes/` (e.g. `users.js`, `health.js`), mounted in `server.js`.
- All data access goes through `db/store.js` — routes never touch the in-memory `users` array directly.
- Validate request bodies in the route handler and return `400` with `{ error: "..." }` on missing fields, `404` with `{ error: "..." }` when a resource isn't found.

## Architecture

- `server.js` is the entry point: builds the Express app, mounts routes, and starts listening only when run directly (so tests can `require` the app without opening a port).
- `routes/` holds one router per resource.
- `db/store.js` is a tiny in-memory data helper standing in for a real database — data resets on restart.
