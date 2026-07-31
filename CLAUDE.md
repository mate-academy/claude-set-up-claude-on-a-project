# claude-course-starter

A small Express API with an in-memory user store, used as a training project.

## Commands

- `npm run dev` — start the API with auto-reload on http://localhost:3000
- `npm test` — run the tests in `tests/` (Node's built-in test runner + supertest)
- `npm run lint` — run ESLint over the project

## Conventions

- Use `require`/`module.exports` (CommonJS), not `import`/`export` — the project has no ESM/bundler setup.
- One route file per resource under `routes/`, mounted in `server.js`; put new endpoints in a matching resource file instead of adding routes directly to `server.js`.
- Go through `db/store.js` for data access — don't reach into the `users` array from routes or tests.

## Architecture

- `server.js` — entry point; builds the Express app, mounts routers, starts listening (skipped under tests via `require.main === module`).
- `routes/` — one file per resource (`users.js`, `health.js`), each exporting an Express `Router`.
- `db/store.js` — in-memory data helper; the only place that touches the `users` array directly. Data resets on restart.