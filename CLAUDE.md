## Project
A minimal Express.js REST API (teaching project for the Claude Code course) with two resources: `/health` (liveness check) and `/users` (list, get-by-id, create). 

## Commands
npm run dev      # starts the API on http://localhost:3000 with hot-reload (node --watch)
npm test         # runs all tests via node --test
npm run lint     # ESLint (eslint:recommended)

## Conventions
- Route handlers validate only presence of required fields (e.g. `name`/`email` on `POST /users`) — no schema validation library.
- Store operations stay synchronous; don't introduce async/await into `db/store.js` without a reason to.
- ESLint's `no-unused-vars` allows unused `req`, `res`, `next`, and any `_`-prefixed name.

## Architecture
- `server.js` — entry point. Builds the Express app, mounts `/users` and `/health` routers, and only calls `app.listen()` when run directly (`require.main === module`), so `tests/` can `require("../server")` and drive it with `supertest` against an unopened port.
- `routes/` — one file per resource, each exporting an Express `Router`. Handlers call into `db/store.js` directly; there's no service/controller layer.
- `db/store.js` — in-memory array of users plus synchronous `getAllUsers` / `getUserById` / `createUser`. Stand-in for a real database.
- `tests/` — `node:test` + `node:assert` + `supertest`, one file per resource, one async test per endpoint behavior.


