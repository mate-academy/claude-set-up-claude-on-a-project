# CLAUDE.md

A small Express REST API that serves users and a health check from an in-memory store.

## Commands

- `npm run dev` — start the API on http://localhost:3000 (auto-restarts on file changes)
- `npm test` — run the tests (Node's built-in test runner)
- `npm run lint` — run ESLint

CI runs `npm run lint` and `npm test` on every push. Both must pass before a change is done.

## Conventions

- Use CommonJS (`require` / `module.exports`), not ES modules (`import` / `export`). ESLint is set to `sourceType: "script"`.
- Write tests with `node:test`, `node:assert` and `supertest`, not Jest or Mocha. Import `app` from `server.js` and never call `app.listen` in tests.
- One router file per resource in `routes/`, mounted in `server.js` with `app.use("/<resource>", ...)`. Don't put handlers in `server.js`.
- Routes read and write data only through functions exported by `db/store.js`. Never touch the store's arrays directly.
- Errors are returned as JSON `{ error: "message" }` with the matching status code (400 for bad input, 404 for not found).
- Config comes from `process.env`. Document new variables in `.env.example`. Never read, edit or commit `.env`.

## Architecture

- `server.js` builds the Express app, mounts the routers and exports `app`. It only listens when run directly.
- `routes/` holds one Express router per resource (`users.js`, `health.js`).
- `db/store.js` is the only data layer. It is in-memory and resets on restart.
- `tests/` holds the supertest tests against the exported `app`.
