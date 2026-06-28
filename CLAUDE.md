# CLAUDE.md

A small Express REST API for users, backed by an in-memory data store. Used as the working project for the Claude Code course.

## Commands

- `npm run dev` — start the API with auto-reload on http://localhost:3000
- `npm test` — run the test suite (`node --test`)
- `npm run lint` — check style with ESLint

## Conventions

- Use CommonJS (`require` / `module.exports`), not ES module `import`/`export` — the project sets `"sourceType": "script"`.
- Use double-quoted strings, matching the existing files.
- One route file per resource in `routes/`; all data access goes through `db/store.js` — routes never touch the data array directly.
- Each route returns the documented status codes: `404` for a missing user, `400` when `name` or `email` is missing, `201` on create.

## Architecture

- `server.js` — entry point. Creates the Express app, mounts routers, and only calls `listen()` when run directly so tests can import `app`.
- `routes/` — one router per resource (`users.js`, `health.js`), mounted under `/users` and `/health`.
- `db/store.js` — a tiny in-memory store (`getAllUsers`, `getUserById`, `createUser`). Data resets on restart; there is no real database.
- `tests/` — `node:test` + `supertest`, importing the app from `server.js`.
