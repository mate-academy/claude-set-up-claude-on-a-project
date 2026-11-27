# CLAUDE.md

Small Express REST API for users (list, fetch, create) with an in-memory store and a health check.

## Commands

- `npm run dev`: start the API with `node --watch` on port 3000 (or `PORT`)
- `npm test`: run the tests with Node's built-in test runner
- `npm run lint`: ESLint; CI runs lint and test on every push, so both must pass

## Conventions

- CommonJS only: use `require`/`module.exports`, not `import`/`export` (ESLint is set to `sourceType: "script"`).
- Tests use `node:test` + `node:assert` with supertest against the exported `app`, not Jest or Mocha, and never a real port.
- Routes never touch data directly: go through `db/store.js` functions, and add a new function there rather than editing the array from a route.
- Errors return JSON `{ "error": "<message>" }` with the right status (400 for invalid input, 404 for not found); successful creates return 201.

## Architecture

- `server.js`: entry point; mounts one router per resource and exports `app`. It only calls `listen` when run directly, so tests can import it.
- `routes/<resource>.js`: one Express router per resource (`users`, `health`), mounted at `/<resource>`.
- `db/store.js`: in-memory data access; resets on restart, so nothing persists.
- `tests/*.test.js`: picked up automatically by `node --test`.
