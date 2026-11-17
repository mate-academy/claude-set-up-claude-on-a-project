# claude-course-starter

Small Express API (users + health) used as the practice project for the Claude Code course.

## Commands
- `npm run dev` — start the API with auto-reload on http://localhost:3000
- `npm test` — run tests (`node --test`)
- `npm run lint` — run ESLint; run it and `npm test` before finishing any change

## Conventions
- CommonJS only: use `require` / `module.exports`, not `import` / `export`.
- Tests use `node:test`, `node:assert` and `supertest`. Do not add Jest or Mocha.
- Tests import `app` from `server.js`; never call `app.listen` in tests.
- Error responses are JSON shaped `{ "error": "message" }` with the right status (400 invalid input, 404 missing).
- Route handlers never touch data directly; always go through `db/store.js`.
- Convert `req.params.id` with `Number(...)` before looking anything up.
- Don't add dependencies without asking.

## Architecture
- `server.js` — entry point; builds the Express app, mounts routers, exports `app`. It only calls `listen` when run directly.
- `routes/` — one router file per resource (`users.js`, `health.js`), mounted at `/<resource>` in `server.js`.
- `db/store.js` — in-memory data store (not persisted, resets on restart). Swap point for a real DB later.
- `tests/` — one `<resource>.test.js` per route file.
- Config comes from env vars (`PORT`); real values live in `.env` (git-ignored). Never read or commit it.
