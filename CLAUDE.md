# CLAUDE.md

# Project
A small Express API for managing users, with a health endpoint
and an in-memory data store.

## Commands
- `npm install` — install dependencies.
- `npm run dev` — start the API with automatic restart.
- `npm test` — run tests using the Node.js test runner.
- `npm run lint` — check code style with ESLint.

## Conventions
- Keep resource-specific routes in separate files under `routes/`;
  do not add route handlers directly to `server.js`.
- Access application data through `db/store.js`;
  do not create separate data stores inside route handlers.
- Use the existing Node.js test runner and Supertest for API tests;
  do not introduce another test framework.
- Follow the existing ESLint configuration.

## Architecture
- `server.js` is the application entry point.
- `routes/users.js` contains user-related API routes.
- `routes/health.js` contains the health endpoint.
- `db/store.js` manages in-memory data; data is lost on restart.
- `tests/` contains automated tests.

## Working rules
- Read the relevant files before proposing changes.
- Keep changes focused on the requested task.
- Run `npm test` and `npm run lint` after code changes.
- Report checks that failed or could not be run.
- Never commit secrets, `.env`, or `.claude/settings.local.json`.
