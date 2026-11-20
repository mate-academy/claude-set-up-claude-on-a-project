# Project

Starter Express API (users + health endpoints) backed by an in-memory store.

## Commands

- `npm run dev` — start the API with watch mode on http://localhost:3000
- `npm test` — run tests (`node --test`, supertest)
- `npm run lint` — ESLint; run before finishing any change

## Conventions

- CommonJS only (`require` / `module.exports`), not ES modules.
- Routes never touch data directly: call functions from `db/store.js`, not module-level arrays.
- Validate input in the route and return `res.status(4xx).json({ error: "..." })`, not thrown errors.
- Test through the exported `app` with supertest; never call `app.listen` in tests.
- Read config from `process.env`; never hardcode secrets or read `.env` directly.

## Architecture

- `server.js` — entry point; mounts routers, exports `app`, listens only when run directly.
- `routes/` — one Express router file per resource (`users.js`, `health.js`), mounted at `/<resource>`.
- `db/store.js` — in-memory data access; state resets on restart.
- `tests/` — `*.test.js` files using `node:test` and `node:assert`.
