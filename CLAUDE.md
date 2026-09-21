# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

Small Express REST API (users + health check) backed by an in-memory store.

## Commands

- `npm run dev`: start the API with auto-reload on http://localhost:3000 (`PORT` overrides)
- `npm test`: run all tests (Node's built-in runner, `node --test`)
- `node --test --test-name-pattern="404"`: run only the tests whose names match
- `npm run lint`: ESLint. CI runs lint and then test on Node 22, so both must pass.

## Conventions

- Use CommonJS (`require` / `module.exports`), not ES modules. ESLint is set to `sourceType: "script"`.
- Routes never touch data directly. Add a function to `db/store.js` and call it from the route.
- Send errors as `res.status(<code>).json({ error: "<message>" })`, and use `return` for early exits.
- Write tests with `node:test` + `node:assert` + `supertest` against the exported `app`, not Jest and not a running server.
- Put a comment above each handler in the form `// METHOD /path — what it does`.

## Architecture

- `server.js` builds the Express app, mounts one router per resource (`/users`, `/health`), and exports `app`. It only calls `listen()` when run directly, so tests can import it without opening a port.
- `routes/<resource>.js` has one `express.Router()` per resource. A new resource means a new file here plus an `app.use(...)` line in `server.js`.
- `db/store.js` is a module-level in-memory array, reset on every restart. Tests share this state within a run, so a `POST` in one test is visible to later tests.
