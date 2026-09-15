# claude-course-starter

Small Express REST API (users + health check) backed by an in-memory store.

## Commands

- `npm run dev` — start the API with auto-reload on http://localhost:3000 (`PORT` overrides)
- `npm test` — run the tests with Node's built-in `node --test` runner
- `npm run lint` — ESLint; CI runs lint, then tests, on every push and PR, so both must pass

## Conventions

- CommonJS only: `require` / `module.exports`, not `import` / `export` (ESLint parses files as scripts).
- Tests use `node:test` + `node:assert` + `supertest` against the exported `app` — not Jest or Mocha, and never call `app.listen()` in a test.
- Routes never touch data directly: add a function to `db/store.js` and call it from the route.
- Error responses are JSON `{ error: "<message>" }` with a matching status (400 bad input, 404 not found); successful creates return 201.
- Never read or edit `.env`; document new config in `.env.example` and read it via `process.env`.

## Architecture

- `server.js` builds the app, mounts one router per path, and exports `app`; it only listens when run directly, so tests can import it.
- `routes/` — one router file per resource (`users.js` → `/users`, `health.js` → `/health`); a new resource gets its own file, mounted in `server.js`.
- `db/store.js` — in-memory data layer standing in for a database; data resets on every restart.
- `tests/` — `*.test.js` files, discovered automatically by `node --test`.
