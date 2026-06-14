# CLAUDE.md

A small Express REST API used as the working codebase for the Claude Code course. It exposes `/users` and `/health` endpoints backed by an in-memory store.

## Commands

- `npm run dev` — start the API with file watching on http://localhost:3000
- `npm test` — run the test suite (Node's built-in `node --test` runner)
- `npm run lint` — check style with ESLint
- Run a single test file: `node --test tests/users.test.js`

## Conventions

- Use CommonJS (`require` / `module.exports`), not ES module `import`/`export` — ESLint is configured for `sourceType: "script"`.
- Use double quotes for strings, matching the existing files.
- Add one route file per resource under `routes/`, then mount it in `server.js` with `app.use("/<resource>", ...)`.
- Access data only through `db/store.js`; route handlers never touch the underlying data array directly.
- Return JSON errors as `{ error: "message" }` with the appropriate status code (e.g. 400 for validation, 404 for missing).

## Architecture

- `server.js` is the entry point: it builds the Express `app`, mounts routers, and only calls `app.listen` when run directly (`require.main === module`). It exports `app` so tests can import it without opening a port — keep this guard intact.
- `routes/` holds one Express `Router` per resource (`users.js`, `health.js`).
- `db/store.js` is a tiny in-memory data layer standing in for a real database. Data resets on every restart and is not persisted.
- Tests use `supertest` against the imported `app`, so no server needs to be running.
