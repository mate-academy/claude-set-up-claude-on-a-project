# CLAUDE.md

A small Express (CommonJS) REST API for users, with an in-memory store.

## Commands

- `npm run dev`: start the API on http://localhost:3000 with `node --watch` (`PORT` overrides the port)
- `npm test`: run all tests with the built-in `node:test` runner
- `node --test tests/users.test.js`: run one test file
- `npm run lint`: ESLint (`eslint:recommended`)

CI (`.github/workflows/ci.yml`, Node 22) runs `npm run lint` and then `npm test` on every push and PR. Keep both passing.

## Conventions

- Use CommonJS (`require` / `module.exports`), not ES modules. ESLint is set to `sourceType: "script"`.
- Use one router file per resource in `routes/`, mounted in `server.js` with `app.use("/<resource>", ...)`.
- Route handlers never touch data directly. They go through functions exported from `db/store.js`.
- Errors are returned as `res.status(code).json({ error: "<message>" })`. Validation failures are 400, missing resources are 404, and successful creates are 201.
- Tests use `supertest` against the exported `app` (`require("../server")`). Never start a real server in tests.

## Architecture

- `server.js` builds the Express app, mounts the routers and exports `app`. It only calls `listen()` when run directly (`require.main === module`), which is what lets tests import it without opening a port.
- `routes/*.js` are thin `express.Router()` handlers. They parse params (for example, `Number(req.params.id)`), validate input, call the store and shape the response.
- `db/store.js` is a module-level in-memory array that resets when the process restarts. It has no persistence, and its state is shared across every test in the same process, so tests must not rely on exact user counts or IDs.
