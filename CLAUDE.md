# CLAUDE.md

A small Express REST API (users + health check) with an in-memory data store.

## Commands

- `npm install` — install dependencies (Node 22, same as CI)
- `npm run dev` — start the API on http://localhost:3000 with auto-reload
- `npm test` — run the tests (`node --test`)
- `npm run lint` — run ESLint; CI runs lint then tests, so both must pass

## Conventions

- Use CommonJS (`require` / `module.exports`), not ES modules — ESLint is set to `sourceType: "script"`.
- Routes never touch data directly: read and write only through functions exported from `db/store.js`. Add a new store function rather than mutating `users` from a route.
- Send errors as `res.status(<code>).json({ error: "<message>" })`, using 400 for invalid input and 404 for a missing resource.
- Write tests with `node:test`, `node:assert` and `supertest`, calling `request(app)` on the app exported from `server.js`. Don't add Jest or Mocha, and don't start a real server in tests.
- Don't add new dependencies without asking first.

## Architecture

- `server.js` — the entry point. It builds the Express app, mounts each router under its path (`/users`, `/health`), and only calls `listen` when run directly. It exports `app` for the tests.
- `routes/` — one `express.Router` file per resource. A new resource gets its own file and an `app.use` line in `server.js`.
- `db/store.js` — the in-memory data layer. Data resets on every restart, and it stands in for a real database later.
- `tests/` — `*.test.js` files, picked up automatically by `node --test`.
- Config comes from environment variables (`PORT`). `.env.example` documents them; never read or edit `.env`.
