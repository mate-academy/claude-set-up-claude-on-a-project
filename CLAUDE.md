# claude-course-starter

Small Express REST API (users + health check) with an in-memory store, used as a practice project.

## Commands
- `npm run dev` — start the API with auto-reload on http://localhost:3000
- `npm test` — run tests (Node's built-in `node:test` + supertest)
- `npm run lint` — ESLint (`eslint:recommended`); CI runs lint then test on every push/PR

## Conventions
- CommonJS only: use `require` / `module.exports`, not `import` / `export`.
- Tests use `node:test` and `node:assert`, not Jest or Mocha; put them in `tests/<resource>.test.js` and call the app through supertest (`request(app)`), never by opening a real port.
- Routes never touch data directly: read and write through functions exported from `db/store.js`.
- Errors return JSON `{ "error": "<message>" }` with the right status (400 invalid input, 404 not found).
- Never read, print or commit `.env`; add new config keys to `.env.example` instead.

## Architecture
- `server.js` — builds the Express app, mounts routers, exports `app`; only listens when run directly.
- `routes/` — one file per resource (`users.js`, `health.js`), each exporting an `express.Router()` mounted at `/<resource>`.
- `db/store.js` — in-memory data helpers; data resets on every restart.
