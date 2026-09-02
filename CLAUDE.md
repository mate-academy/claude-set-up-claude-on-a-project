# CLAUDE.md

A small Express REST API for the Claude Code course, with health and in-memory user endpoints.

## Commands

- `npm run dev` — start the API with file watching at `http://localhost:3000`.
- `npm test` — run the Node.js test suite.
- `npm run lint` — check the repository with ESLint.
- `npm start` — start the API without file watching.

## Conventions

- Use CommonJS (`require` and `module.exports`), not ES modules.
- Keep one router per resource in `routes/` and mount it in `server.js`.
- Access in-memory application data through `db/store.js`; do not duplicate storage inside route files.
- Test HTTP behavior with `node:test` and Supertest, importing `app` without opening a real port.
- Keep secrets in `.env`; never commit credentials or copy values from `.env` into source files.

## Architecture

- `server.js` creates the Express app, applies shared middleware, mounts routers, and only listens when run directly.
- `routes/` contains the HTTP handlers, with one file per API resource.
- `db/store.js` owns the in-memory data access used by the routes.
- `tests/` contains API tests that import the Express app.
