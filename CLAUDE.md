# Course API

A small Express REST API for managing users, used as the practice project for the Claude Code course.

## Commands

- `npm run dev` — start the API on http://localhost:3000
- `npm test` — run the test suite (Node's built-in test runner + supertest)
- `npm run lint` — check code style with ESLint; run it before every commit

## Conventions

- Use CommonJS (`require` / `module.exports`), not ES modules (`import` / `export`).
- Access data only through the functions in `db/store.js`; never read or change the data array directly from a route.
- Return errors as JSON `{ error: '<message>' }` with the right status code (400 for bad input, 404 for a missing record), not plain text.
- Write tests with `node:test`, `node:assert` and `supertest` against the exported `app`, not by starting the server.
- Never read or print `.env`; use `.env.example` to see which settings exist.

## Architecture

- `server.js` is the entry point: it creates the Express app, mounts the routers and exports `app` for tests.
- `routes/` has one file per resource (`users.js`, `health.js`), each exporting an `express.Router()`.
- `db/store.js` is an in-memory data helper; all data access goes through it. Data resets when the server restarts.
- `tests/` holds the test files, one per resource.