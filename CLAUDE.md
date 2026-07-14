# CLAUDE.md

A small Express REST API for managing users, used as the starter project for the Claude Code course.

## Commands

- `npm install` — install dependencies (run once after cloning).
- `npm run dev` — start the API with auto-reload on http://localhost:3000.
- `npm test` — run the test suite (Node's built-in test runner + supertest).
- `npm run lint` — check code style with ESLint.

## Conventions

- Use CommonJS modules (`require` / `module.exports`), not ES module `import` / `export`. The project's ESLint config sets `sourceType: "script"`.
- Add each new resource as its own file in `routes/`, mounted in `server.js` — one file per resource.
- Access and modify data only through `db/store.js`; never read or mutate the in-memory `users` array directly.
- Validate input in the route and return the matching status code: `400` for missing fields, `404` for a resource that doesn't exist, `201` on create.
- Match the existing style: two-space indentation and double-quoted strings.

## Architecture

- `server.js` is the entry point. It creates the Express app, enables JSON parsing, mounts the route files, and exports `app` so tests can import it without opening a port.
- `routes/` holds one router per resource: `users.js` (list / get by id / create) and `health.js` (liveness check).
- `db/store.js` is a tiny in-memory data store standing in for a real database. Data resets on every server restart.
- `tests/` uses `node:test` and `supertest` to send requests to the imported `app`.
