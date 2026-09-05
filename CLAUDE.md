# CLAUDE.md
A simple Express API with users and health endpoints.
## Commands
- `npm run dev` — start the API with auto-reload on `http://localhost:3000`
- `npm test` — run all tests
- `npm run lint` — check code style with ESLint


## Architecture
- `server.js` is the entry point: builds the Express `app`, mounts routers, and only calls `app.listen` when run directly, so tests can `require("../server")` and hit the app in-process via `supertest`.
- One route file per resource under `routes/` (`users.js`, `health.js`), each exporting an `express.Router()`.
- All data access goes through `db/store.js`, a tiny in-memory module.


## Conventions
- Use `res.status(400).json({ error: "..." })` for validation errors, not throw statements.
- Keep Express handler signatures as-is even when a param is unused (e.g., `req`, `res`, `next`, or `_`-prefixed names).
