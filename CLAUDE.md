# CLAUDE.md

Small Express REST API (users + health check) with an in-memory store, used as the Claude Code course starter.

## Commands

```bash
npm run dev    # start on http://localhost:3000 with auto-restart
npm test       # run tests (node:test + Supertest)
npm run lint   # ESLint - CI runs lint, then test
```

## Conventions

- Use CommonJS (`require` / `module.exports`), not ES `import`/`export` - ESLint is set to `sourceType: script`.
- Read and write data only through the functions in `db/store.js`; never touch the `users` array or add a database from a route.
- Return errors as JSON `{ error: "message" }` with the right status code (400 bad input, 404 not found), not plain text.
- Write tests with `node:test`, `node:assert` and Supertest against the exported `app`; don't add Jest or start a real server.
- Run `npm run lint` and `npm test` after any change; both must pass.

## Architecture

- `server.js` - builds the app, mounts each router with `app.use("/<resource>", ...)`, and only calls `listen` when run directly (so tests can import `app`).
- `routes/` - one file per resource (`users.js`, `health.js`); request validation lives here. A new resource gets a new file here plus one `app.use` line in `server.js`.
- `db/store.js` - in-memory data; resets on every restart.
- `tests/` - one test file per resource.
