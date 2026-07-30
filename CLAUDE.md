# CLAUDE.md

A small Express API (Node's built-in `--watch` and `node:test` runner, no framework tooling) used as a teaching sandbox for the Claude Code course.

## Commands

- `npm install` — install dependencies
- `npm run dev` — start the API on http://localhost:3000 with auto-reload
- `npm test` — run all tests (`node --test`)
- `npm run lint` — run ESLint

To run a single test file: `node --test tests/users.test.js`

## Conventions

- One route file per resource under `routes/`, mounted in `server.js` (e.g. `routes/users.js` → `/users`).
- All data access goes through `db/store.js`, never manipulate the in-memory `users` array from route handlers.
- Use `require`/`module.exports` (CommonJS), not ES module `import`/`export`.
- Double-quoted strings and semicolons, per `.eslintrc.json` (`eslint:recommended`).

## Architecture

- `server.js` is the entry point: builds the Express app, mounts routers, and only calls `app.listen` when run directly (`require.main === module`), so `tests/` can import `app` without opening a real port.
- `db/store.js` is a tiny in-memory data store standing in for a real database; state resets on every restart.
- Tests use `supertest` against the exported `app`, not a running server.
