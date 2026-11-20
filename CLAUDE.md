# Project

Starter Express API backed by an in-memory store.

## Commands

- `npm run dev` — start the API in watch mode
- `npm test` — run tests (`node --test`, supertest)
- `npm run lint` — ESLint; run before finishing any change

## Conventions

- CommonJS only (`require` / `module.exports`), not ES modules.
- Routes never touch data directly: call functions from `db/store.js`, not module-level arrays.
- Validate input in the route and return `res.status(4xx).json({ error: "..." })`, not thrown errors.
- Test through the exported `app` with supertest; never call `app.listen` in tests.
- New config goes through `process.env` and gets a placeholder in `.env.example`; never commit real secrets.

## Architecture

- `server.js` — entry point; mounts routers, exports `app`, listens only when run directly.
- `routes/` — one Express router file per resource, mounted at `/<resource>`.
- `db/store.js` — in-memory data access; state resets on restart.
- `tests/` — `*.test.js` files using `node:test` and `node:assert`.
