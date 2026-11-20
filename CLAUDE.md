# CLAUDE.md

A small Express (Node.js) REST API serving users and a health check, used as a starter project for the Claude Code course.

## Commands

- `npm run dev`: start the API on http://localhost:3000
- `npm test`: run all tests
- `node --test tests/users.test.js`: run a single test file
- `npm run lint`: run ESLint over the whole repo

CI runs lint and tests on Node 22. Both must pass.

## Conventions

- Use CommonJS (`require` / `module.exports`), not ES modules. ESLint is set to `sourceType: "script"`, so `import` fails lint.
- Write tests with `node:test` and `node:assert`, and use `supertest` against the exported `app`. Don't add Jest or Mocha.
- Route handlers never touch data directly. They call functions exported from `db/store.js`.
- Return errors as JSON `{ "error": "<message>" }` with the matching status code (400 for validation, 404 for not found). Successful creates return 201.
- Only `_`, `req`, `res`, and `next` may be unused function arguments. Lint warns on any other unused variable.

## Architecture

- `server.js` builds the Express app, mounts each router under its path prefix (`/users`, `/health`), and exports `app`. It only calls `listen()` when run directly (`require.main === module`), so tests import `app` without opening a port.
- `routes/` holds one `express.Router()` file per resource. To add a resource, create `routes/<name>.js` and mount it in `server.js`.
- `db/store.js` is an in-memory store standing in for a database. Data resets on restart and is shared across all tests in a process. Tests that create users change state that later tests in the same file see.
- Config comes from environment variables (see `.env.example`). Never read or commit `.env`.
