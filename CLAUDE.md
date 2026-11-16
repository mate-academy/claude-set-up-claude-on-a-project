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

## Commands
#- Dev server with reload: `npm run dev` (http://localhost:3000, `PORT` overrides)
#- All tests: `npm test` (Node's built-in `node --test` runner + supertest)
#- One test file: `node --test tests/users.test.js`
#- One test by name: `node --test --test-name-pattern="returns 404" tests/`
#- Lint: `npm run lint`. CI runs lint and then tests, so run both before pushing.

## Conventions
#- CommonJS only (`require` / `module.exports`). No ESM, no TypeScript. ESLint parses files as `sourceType: "script"`.
#- Errors: respond with `res.status(<code>).json({ error: "<message>" })` and `return` early. Use 400 for invalid input and 404 for a missing resource.
#- Routes never touch data directly. Every read and write goes through functions exported from `db/store.js`.
#- Tests use `node:test` + `node:assert` and call `request(app)` from supertest. Don't start a real server in tests.

## Architecture
#- `server.js` builds the Express app, mounts one router per resource (`/users`, `/health`), and exports `app`. It only calls `listen()` when run directly (`require.main === module`), which is how tests import it without binding a port.
#- `routes/<resource>.js` holds one `express.Router()` per resource. A new resource gets a new file and a mount line in `server.js`.
#- `db/store.js` is the in-memory stand-in for a database. It is seeded with users id 1 and 2, IDs auto-increment, and state resets on restart. Because state is module-level, tests in the same file share it (writes from one test show up in the next), so assert on created records, not total counts.
