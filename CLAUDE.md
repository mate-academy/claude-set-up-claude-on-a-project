# CLAUDE.md

Small Express REST API (users + health check) backed by an in-memory store.

## Commands

- `npm run dev` - start the API with auto-reload on http://localhost:3000
- `npm test` - run all tests (built-in `node:test` runner, no Jest/Mocha)
- `node --test tests/users.test.js` - run one test file
- `npm run lint` - ESLint (`eslint:recommended`)

## Conventions

- Use CommonJS (`require` / `module.exports`), not ES modules.
- One resource = one file in `routes/` exporting an `express.Router()`, mounted in `server.js` with `app.use("/<resource>", ...)`.
- Routes never touch data directly - all reads/writes go through functions in `db/store.js`.
- Error responses are JSON `{ error: "<message>" }`: 400 for invalid input, 404 for missing.
- Tests use `supertest` against the exported `app` (`require("../server")`); never call `app.listen()` in tests.

## Architecture

- `server.js` builds the app, mounts routers, exports `app`; calls `listen()` only when run directly, so tests can import it without opening a port.
- `routes/*.js` - HTTP layer, one router per resource: validate the request, call the store, shape the response.
- `db/store.js` - in-memory stand-in for a database; state resets on restart and is shared across tests (don't assume a fixed user count).