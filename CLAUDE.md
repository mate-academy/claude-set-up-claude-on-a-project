# Claude Course Starter

A small Express API with health checks and in-memory user management.

## Commands

- `npm run dev` — start the API in watch mode.
- `npm test` — run the Node test suite.
- `npm run lint` — check the code with ESLint.

## Conventions

- Use CommonJS (`require` and `module.exports`), not ES modules.
- Put each resource in its own Express router under `routes/`, not directly in `server.js`.
- Access application data through `db/store.js`, not from route-local data structures.

## Architecture

`server.js` configures Express, mounts resource routers, and exports the app for tests.
`routes/` contains one router file per resource.
`db/store.js` is the data-access layer and currently stores data in memory.
