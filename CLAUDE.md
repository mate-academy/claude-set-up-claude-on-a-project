# CLAUDE.md

A minimal Express API (users + health endpoints) backed by an in-memory store, used as the starter project for the Claude Code course.

## Commands

```
npm install
npm run dev      # start the API with auto-reload on http://localhost:3000
npm start        # start the API without auto-reload
npm test         # run all tests (node:test)
npm run lint     # run eslint
```

Run a single test file: `node --test tests/users.test.js`

## Conventions

- CommonJS (`require`/`module.exports`), not ESM — matches `sourceType: "script"` in `.eslintrc.json`.
- Route handlers stay thin: validate input, delegate to `db/store.js` for data, return JSON. No business logic in route files.
- Errors are returned as JSON (`{ error: "..." }`) with the appropriate status code, not thrown.

## Architecture

- `server.js` is the entry point. It builds the Express `app`, mounts routers, and only calls `app.listen` when run directly (`require.main === module`) — this lets `tests/users.test.js` import `app` and drive it with `supertest` without opening a real port.
- One route file per resource under `routes/` (`users.js`, `health.js`), mounted in `server.js` under its resource path.
- `db/store.js` is the sole data access layer — an in-memory array, not persisted across restarts. Routes never touch the `users` array directly; they go through its exported functions (`getAllUsers`, `getUserById`, `createUser`).
