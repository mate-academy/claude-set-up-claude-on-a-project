## Claude

The project provides the API for users and their health data

## Commands

- `npm run dev` — start the API with auto-reload (http://localhost:3000)
- `npm test` — run the test suite (Node's built-in test runner)
- `npm test -- --test-name-pattern="<name>"` — run a single test by name
- `npm run lint` — check code style with ESLint
- CI (`.github/workflows/ci.yml`) runs `npm install`, `npm run lint`, and `npm test` on every push/PR.

## Conventions

- Double quotes and semicolons throughout (matches existing files); no Prettier/formatter is configured.
- One route file per resource under `routes/`, mounted in `server.js` (e.g. `routes/users.js` → `app.use("/users", usersRoutes)`).
- Config comes from environment variables (see `.env.example`); real secrets belong in a git-ignored `.env`, never committed.

## Architecture

- `server.js` is the entry point: builds the Express `app`, mounts routers, and only calls `app.listen` when run directly (`require.main === module`) — this lets `tests/` import `app` and hit it with supertest without opening a real port.
- `db/store.js` is a tiny in-memory data layer (plain arrays, no persistence — resets on restart).
- `routes/health.js` and `routes/users.js` follow the same shape: an `express.Router()` exporting handlers, one file per resource.
