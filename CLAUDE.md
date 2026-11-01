# CLAUDE.md

## Description
A small Express REST API for managing users and providing a health-check endpoint, using an in-memory data store.

## Commands
- `npm install` # install dependencies.
- `npm run dev` # start the API at http://localhost:3000.
- `npm test` # run automated tests.
- `npm run lint` # check code style.

## Conventions
- All API route handlers must go in the `routes/` directory. Never add endpoints directly to `server.js`.
- Always use `async/await` for asynchronous operations. Do not use callbacks.

## Architecture
- `server.js` is the main entry point and mounts the API routes.
- `routes/` contains one route file per resource, such as `users.js` and `health.js`.
- `db/store.js` handles all data access. Routes must not access the data directly.
- `tests/` contains automated tests for the application.

