# Claude Course Starter

Small Express API (users + health endpoints) backed by an in-memory store; used as the base for the Claude Code course projects.

## Commands

- `npm run dev` — start the API with auto-reload on http://localhost:3000
- `npm test` — run the tests (`node --test`, no Jest/Mocha)
- `npm run lint` — ESLint; run it and `npm test` before finishing any change

## Conventions

- Use CommonJS (`require` / `module.exports`), not ES modules (`import` / `export`).
- Routes never touch data directly: read and write only through functions in `db/store.js`.
- Return errors as JSON `{ "error": "<message>" }` with the right status (400 invalid input, 404 not found).
- Write tests with `node:test` + `node:assert` + `supertest` against the exported `app`; do not call `app.listen` in tests.
- Never read or commit `.env`; new config keys go in `.env.example`.

## Architecture

- `server.js` — entry point: mounts routers, exports `app`, and only listens when run directly.
- `routes/` — one Express router file per resource (`users.js`, `health.js`), mounted at `/<resource>`.
- `db/store.js` — in-memory data helper; data resets on restart.
- `tests/` — one `<resource>.test.js` per route file.
