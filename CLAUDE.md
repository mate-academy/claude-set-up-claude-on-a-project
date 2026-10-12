# CLAUDE.md

Starter Express API (users + health endpoints, in-memory data) used as the base project for the Claude Code course.

## Commands


- `npm run dev` — start the API with `node --watch` on http://localhost:3000 (`PORT` env var overrides)
- `npm test` — run tests with the built-in `node --test` runner (not Jest/Mocha)
- `npm run lint` — ESLint (`eslint:recommended`); CI runs lint then test on Node 22

## Architecture

- `server.js` is the entry point. It builds the Express `app`, mounts each router, and only calls `listen` when run directly (`require.main === module`), exporting `app` so tests can use supertest without opening a port.
- `routes/` holds one router file per resource (`users.js`, `health.js`), mounted in `server.js` at `/users` and `/health`.
- `db/store.js` is an in-memory stand-in for a database; data resets on restart. Routes access data only through its exported functions.

## Conventions

- Use `db/store.js` for data access, not direct data manipulation
- Use a new route file in routes/, not adding to existing route files
