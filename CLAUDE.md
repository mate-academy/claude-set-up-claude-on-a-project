# CLAUDE.md

A small Express API for managing users and exposing a health check, backed by an in-memory data store.

## Commands

- `npm run dev` starts the API in watch mode at `http://localhost:3000`.
- `npm test` runs the Node test suite.
- `npm run lint` checks the project with ESLint.

## Conventions

- Use CommonJS with `require` and `module.exports`; do not introduce ES modules.
- Put each API resource in its own router file under `routes/`; do not define resource handlers directly in `server.js`.
- Access application data through `db/store.js`; do not create separate in-memory stores inside route files.
- Do not modify the application code unless the task explicitly requires it.

## Architecture

`server.js` creates the Express app, configures middleware, mounts the route modules, and exports the app for testing. Each API resource has one router file under `routes/`. Shared in-memory data access is centralized in `db/store.js`, and API tests live under `tests/`.