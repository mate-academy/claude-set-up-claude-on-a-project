# Claude Course Starter

Small Express API (users + health check) with an in-memory data store; used as the base project for the Claude Code course.

## Commands

- `npm run dev` — start the API with auto-reload on http://localhost:3000
- `npm test` — run all tests (`node --test`)
- `node --test tests/users.test.js` — run a single test file
- `npm run lint` — ESLint; run it and `npm test` before every commit (CI runs both)

## Conventions

- CommonJS only: `require` / `module.exports`. Do not use `import` / `export` (ESLint is set to `sourceType: "script"`).
- Routes never touch data directly — all reads and writes go through functions exported from `db/store.js`.
- Error responses are JSON shaped `{ error: "message" }` with a proper status code (400 validation, 404 not found); success returns the resource as JSON.
- Convert `req.params` ids with `Number(...)` before looking them up (the store uses numeric ids).
- Tests use `node:test` + `supertest` against the `app` exported from `server.js`. Never call `app.listen` in tests.

## Architecture

- `server.js` — entry point; creates the Express app, mounts routers, listens only when run directly, exports `app`.
- `routes/` — one router file per resource (`users.js`, `health.js`), mounted in `server.js`.
- `db/store.js` — in-memory data helper standing in for a database; data resets on restart.
- `tests/` — one `*.test.js` per resource.
- Config comes from env vars (see `.env.example`); real values live in `.env`, which is git-ignored and must never be read or committed.
