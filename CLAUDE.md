# CLAUDE.md

A small Express REST API (users and health endpoints) backed by an in-memory store.

## Commands

- `npm run dev`: start the API with auto-reload on http://localhost:3000 (`PORT` overrides it)
- `npm test`: run all tests with Node's built-in runner (`node --test`)
- `node --test --test-name-pattern="404" tests/users.test.js`: run a single test by name
- `npm run lint`: run ESLint
- Run `npm run lint` and `npm test` before committing (CI runs both).

## Conventions

- Use CommonJS (`require` / `module.exports`), not ES `import`/`export`. ESLint is configured with `sourceType: "script"`.
- Routes never touch data directly. Add or change data access as a function in `db/store.js` and call it from the route.
- Send errors as JSON `{ error: "<message>" }` with the matching status code (400 for invalid input, 404 for not found). Send 201 on create.
- Write tests with `node:test` + `node:assert` + `supertest` against the exported `app`. Never start a real server in tests.
- Use double quotes and semicolons, matching the existing code.
- Don’t change package.json or dependencies unless I ask.

## Architecture

- `server.js` builds the Express app, mounts each router under its path (`/users`, `/health`) and exports `app`. 
- `routes/` has one `express.Router()` file per resource. A new resource means a new file there, mounted in `server.js`.
- `db/store.js` is the only data layer: a module-level array that resets on every restart and is shared across tests in the same process, so tests must not assume a fixed user count after a POST.
