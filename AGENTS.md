# Project: claude-course-starter

A small Express REST API with in-memory data, used as the practice project for the Claude Code course. It exposes `/users` and `/health` and is not meant for production.

## Commands

- `npm run dev` — start the API on http://localhost:3000 with `node --watch`
- `npm test` — run the test suite (`node --test` + supertest)
- `npm run lint` — check style with ESLint

## Conventions

- CommonJS only: use `require(...)` and `module.exports`, not `import`/`export`.
- One router file per resource in `routes/`, mounted in `server.js`; keep handlers thin and put data access in `db/store.js`.
- Validate input in the route and return JSON errors with the right status: `400` for missing fields, `404` for unknown ids.
- Match the existing style: 2-space indent, double quotes, semicolons — `npm run lint` must stay clean.

## Architecture

- `server.js` builds the Express app, mounts the routers, and exports `app`. It only calls `listen()` when run directly, so tests can import it without opening a port.
- `routes/users.js` and `routes/health.js` hold the endpoints, one file per resource.
- `db/store.js` is an in-memory store (module-level array) that resets on restart; all data access goes through its exported functions.
- `tests/users.test.js` imports `app` and drives it with supertest.
