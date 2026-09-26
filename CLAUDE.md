# CLAUDE.md

Small Express 4 REST API (users + health check) with an in-memory store.

## Commands

- `npm run dev` — start on http://localhost:3000 (`PORT` overrides)
- `npm test` — run all tests (`node --test`)
- `node --test --test-name-pattern="404" tests/users.test.js` — run a single test
- `npm run lint` — ESLint; lint and tests must both pass before committing

## Conventions

- Use CommonJS (`require` / `module.exports`), not ES modules (`import` / `export`).
- Use `node:test` + `node:assert` + `supertest`, not Jest or Mocha.
- Use `request(app)` with `app` imported from `../server`, not a real running server, in tests.
- Use the functions exported from `db/store.js` for all data access, not direct data manipulation inside routes.
- Use JSON error bodies shaped `{ error: "<message>" }` with 400 for invalid input and 404 for missing resources, not plain-text errors or other shapes.
- Use a comment naming the method and path above each route handler (e.g. `// GET /users/:id`), not uncommented handlers.
- Use `.env.example` for config samples, not `.env` (never read or commit `.env`).

## Architecture

- `server.js` builds the app, mounts `/users` and `/health`, and exports `app`. It only calls `listen()` when `require.main === module`, which lets tests import it.
- `routes/` has one `express.Router()` file per resource. A new resource needs a new file here plus an `app.use()` line in `server.js`.
- `db/store.js` holds module-level state that resets on restart but is shared across all tests in a file. Don't assume fixed counts or IDs in tests.