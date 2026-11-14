# CLAUDE.md

This repository contains a small Express REST API to manage users.

## Commands

```
npm run dev                          # start API with --watch on http://localhost:3000 (PORT env overrides)
npm test                             # bare `node --test`: auto-discovers *.test.js files (currently tests/)
npm run lint                         # eslint . (eslint:recommended, ESLint 8 + .eslintrc.json)
node --test tests/users.test.js      # run a single test file
node --test --test-name-pattern="404" # run tests whose name matches a pattern
```

## Architecture

- `server.js` builds the Express app, mounts each router under its resource path, and only calls `listen()` when run directly (`require.main === module`). It exports `app` so tests can use it without opening a port.
- `routes/` holds one `express.Router()` file per resource (`users.js` → `/users`, `health.js` → `/health`). A new resource means a new file here plus an `app.use(...)` line in `server.js`.
- `db/store.js` is the only data layer: an in-memory array exposed via functions. Data resets on every restart and is shared across tests in the same process.

## Conventions

- Use CommonJS (`require` / `module.exports`), not ES modules — ESLint is configured with `sourceType: "script"`.
- Routes access data only through functions exported from `db/store.js`; never touch the `users` array directly. Add a new store function when a route needs a new query.
- Return errors as JSON `{ error: "<message>" }` with the matching status (400 for invalid input, 404 for missing resources); successful creates return 201.
- Convert `req.params.id` with `Number(...)` before lookup — store IDs are numbers.
- Precede each route handler with a one-line comment in the form `// METHOD /path — what it does`.
- Write tests with `node:test` + `node:assert` and `supertest` against the exported `app`; don't add Jest/Mocha or start a real server in tests.
- Match existing style: double quotes, semicolons, 2-space indent.
