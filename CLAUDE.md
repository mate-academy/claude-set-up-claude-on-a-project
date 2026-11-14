# CLAUDE.md

Small Express REST API (users + health check) backed by an in-memory store; it's the starter project for the Claude Code course.

## Commands

- `npm run dev` — start the API with auto-reload on http://localhost:3000
- `npm test` — run tests (Node's built-in `node:test` runner + supertest)
- `npm run lint` — ESLint; must pass with no errors (CI runs lint, then tests)

## Conventions

- CommonJS only: use `require` / `module.exports`, not `import` / `export`.
- Tests use `node:test` and `node:assert`, not Jest or Mocha. Put them in `tests/<resource>.test.js` and call the app with `supertest`; never start a real server in tests.
- Routes never touch data directly: read and write through functions exported from `db/store.js`; add a new store function rather than reaching into the array.
- Error responses are JSON `{ "error": "<message>" }` with the right status (400 bad input, 404 not found). Success for create is `201`.
- Run `npm run lint` and `npm test` before calling a change done.
- Don't add dependencies without asking.

## Architecture

- `server.js` — builds the Express app, mounts routers, exports `app`; only listens when run directly so tests can import it.
- `routes/` — one router file per resource (`users.js`, `health.js`), mounted at `/<resource>` in `server.js`. New resource = new file + one `app.use` line.
- `db/store.js` — in-memory data helper standing in for a database; data resets on restart.
- Config comes from env vars (`PORT`); see `.env.example`. Never read or print `.env`.
