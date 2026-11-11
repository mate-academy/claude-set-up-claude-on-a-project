# claude-course-starter

Small Express 4 REST API (users + health check) backed by an in-memory store.

## Commands

- `npm run dev` — start the API on http://localhost:3000 with auto-reload
- `npm test` — run all tests (Node's built-in test runner)
- `npm run lint` — ESLint; must pass before committing (CI runs lint, then tests)

## Architecture

- `server.js` builds the Express app, mounts each router, and exports `app`. It only calls `app.listen` when run directly, so tests can import it without opening a port. Keep it that way.
- `routes/` holds one router file per resource (`users.js`, `health.js`), mounted in `server.js` at `/<resource>`.
- `db/store.js` is the only data layer. Data lives in memory and resets on restart.

## Conventions

- CommonJS only: `require` / `module.exports`, not `import` / `export`.
- Tests use `node:test` + `node:assert` + `supertest` against the exported `app`. Do not add Jest, Mocha, or another test framework.
- Routes never touch data directly; add or change functions in `db/store.js` and call them from the route.
- New resource = new file in `routes/` + one `app.use` line in `server.js`, never a new route in an existing file.
- Errors are JSON `{ "error": "<message>" }` with the right status (400 bad input, 404 not found).
- Convert route params with `Number(req.params.id)` before looking them up; store ids are numbers.
- Don't add dependencies without asking.
