# CLAUDE.md

A small Express REST API (users + health check) used as the starter project for the Claude Code course.

## Commands

```bash
npm run dev    # start the API with auto-reload on http://localhost:3000 (PORT from env)
npm test       # run tests with the built-in node:test runner
npm run lint   # ESLint (eslint:recommended); CI runs lint then tests on Node 22
node --test tests/users.test.js   # run a single test file
```

## Conventions

- Use CommonJS (`require` / `module.exports`), not ES modules — ESLint is configured with `sourceType: "script"`.
- Add a new resource as its own `express.Router()` file in `routes/`, mounted in `server.js`; don't put handlers in `server.js`.
- Read and write data only through functions exported from `db/store.js`; routes never touch the data arrays directly.
- Validate input in the route and return errors as JSON `{ error: "<message>" }` with the matching status (400 bad input, 404 not found); successful creates return 201.
- Tests use `node:test` + `node:assert` with `supertest` against the exported `app` — never start a real server in tests.
- Never read or commit `.env`; document new config in `.env.example` instead.

## Architecture

- `server.js` builds the Express app, mounts routers (`/users`, `/health`), and exports `app`; it only calls `listen` when run directly (`require.main === module`), so tests can import it.
- `routes/` — one router file per resource.
- `db/store.js` — in-memory data store standing in for a database; data resets on every restart.
- `tests/` — API tests driving `app` through `supertest`.
