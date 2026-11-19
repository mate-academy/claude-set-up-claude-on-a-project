# Project

A small Express API for users and health checks, backed by an in-memory store.

## Commands

- `npm run dev` — start the API with automatic restart on changes.
- `npm test` — run the Node.js test suite.
- `npm run lint` — check the code with ESLint.

## Conventions

- Use CommonJS (`require` and `module.exports`), not ES module imports.
- Test HTTP endpoints with `node:test` and Supertest; import the app instead of opening a server port.
- Access user data through `db/store.js` rather than keeping separate route-level state.

## Architecture

`server.js` configures and exports the Express app and starts it only when run directly. Each resource has its own router in `routes/`. `db/store.js` holds user data in memory, so it resets on restart.
