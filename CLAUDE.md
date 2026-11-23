# Project

Small Express API (users + health endpoints) backed by an in-memory store.

## Commands

- `npm run dev` — start the API with auto-reload on http://localhost:3000
- `npm test` — run tests (`node --test`, supertest)
- `npm run lint` — ESLint; run it before finishing any change

## Conventions

- CommonJS only: use `require` / `module.exports`, not `import` / `export`.
- Use double quotes and semicolons, matching existing files.
- One route file per resource in `routes/`; mount it in `server.js`.
- Routes never touch data directly — go through `db/store.js`.
- Validation errors return `{ error: "<message>" }` with 400; missing resources return 404 with the same shape.
- Every new endpoint gets a test in `tests/`. Tests import `app` from `server.js` and never open a real port.
- Config comes from `process.env` (see `.env.example`); never hardcode secrets.

## Architecture

- `server.js` — entry point: builds the Express app, mounts routes, exports `app`. Listens only when run directly.
- `routes/` — HTTP layer (`users.js`, `health.js`).
- `db/store.js` — in-memory data helper; data resets on restart.
- `tests/` — `node:test` tests against the exported `app`.
