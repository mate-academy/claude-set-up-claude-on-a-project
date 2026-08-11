## Project

Starter Express API (users + health endpoints) backed by an in-memory store.

## Commands

- `npm run dev` — start the API on http://localhost:3000 (auto-restarts on change)
- `npm test` — run the test suite (`node --test` + supertest)
- `npm run lint` — check code style with ESLint

## Conventions

- One route file per resource in `routes/`, mounted in `server.js` (e.g. `routes/users.js` → `/users`). New resources follow this pattern, not one giant router.
- All data access goes through `db/store.js` — route handlers never touch the in-memory `users` array directly.
- Error responses are `{ error: "message" }` with the matching status code (400 for bad input, 404 for missing resources), not thrown exceptions.
- Double-quoted strings and semicolons throughout (matches ESLint's `eslint:recommended` config already in `.eslintrc.json`).

## Architecture

- `server.js` is the entry point: builds the Express app, mounts `/users` and `/health`, and only calls `app.listen` when run directly (so tests can `require("../server")` without opening a port).
- `db/store.js` is a fake database — an in-memory array that resets on every restart. Swap this out first if persistence is ever added.
- No auth, no real database, no external services. Keep it that way unless a task explicitly asks otherwise.
