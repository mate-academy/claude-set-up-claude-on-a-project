# claude-course-starter

Small Express REST API (users + health check) backed by an in-memory store.

## Commands
- `npm run dev` — start the API with auto-reload on http://localhost:3000
- `npm test` — run tests (Node's built-in `node --test`)
- `npm run lint` — ESLint; CI runs lint then tests, so both must pass

## Conventions
- Use CommonJS (`require` / `module.exports`), not ES modules (`import`/`export`) — ESLint is set to `sourceType: "script"`.
- Write tests with `node:test` + `node:assert` and `supertest`, not Jest or Mocha. Import `app` from `server.js`; never call `app.listen()` in tests.
- Access data only through functions exported by `db/store.js`, never by touching the `users` array from a route. Add a new store function if one is missing.
- Return errors as JSON `{ error: "<message>" }` with the right status code (400 bad input, 404 not found), not plain text.
- Don't modify `.env`; add new config keys to `.env.example` instead.

## Architecture
- `server.js` builds the Express app, mounts each router (`/users`, `/health`), and only listens when run directly.
- `routes/` holds one `express.Router()` file per resource; a new resource means a new file plus a mount line in `server.js`.
- `db/store.js` stands in for a database: data resets on every restart, and IDs come from an incrementing counter.
