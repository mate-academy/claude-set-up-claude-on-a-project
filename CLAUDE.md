# claude-course-starter

A tiny Express API (users + health routes) backed by an in-memory store, used as a course starter project.

## Commands

- `npm run dev` — start the API with auto-reload on http://localhost:3000
- `npm test` — run the tests in `tests/` (Node's built-in test runner + supertest)
- `npm run lint` — check code style with ESLint

## Conventions

- Use `require`/`module.exports` (CommonJS), not ES module `import`/`export` — the codebase and ESLint config are set to `sourceType: script`.
- Put each resource's routes in its own file under `routes/`, mounted in `server.js` (see `users.js`, `health.js`) — don't add routes directly to `server.js`.
- All data access goes through `db/store.js`, not inline arrays/objects in route files.

## Architecture

- `server.js` is the entry point: builds the Express app, mounts routes, starts listening only when run directly (so tests can `require` the app without opening a port).
- `routes/` has one file per resource (`users.js`, `health.js`), each exporting an Express router.
- `db/store.js` is an in-memory data helper standing in for a real database; data resets on restart.
