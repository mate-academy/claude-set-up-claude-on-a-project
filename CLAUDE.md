# claude-course-starter

A small Express API for managing users, backed by an in-memory store.

## Commands

- `npm run dev` — start the API on http://localhost:3000 (auto-restarts on change)
- `npm test` — run the test suite (`node --test`)
- `npm run lint` — check code style with ESLint

## Conventions

- Use `require`/`module.exports` (CommonJS), not `import`/`export` — the codebase has no ESM/bundler setup.
- Put one route file per resource under `routes/`, and access data only through `db/store.js` — don't query or mutate `users` directly from a route.
- Route handlers validate input and return JSON errors (e.g. `{ error: "..." }`) with the appropriate status code (400, 404) rather than throwing.

## Architecture

- `server.js` is the entry point: it wires up middleware and mounts each resource's router.
- `routes/` holds one file per resource (`users.js`, `health.js`), each exporting an Express router.
- `db/store.js` is the only place that touches data — an in-memory array, reset on every restart.
