# CLAUDE.md

This file includes the changes to the project Claude file to allow for claude to know what to do, irrespective of the developer or specific topic.
## Commands

- `npm install` — install dependencies
- `npm run dev` — start the API with auto-reload on `http://localhost:3000`
- `npm test` — run all tests (`node --test`, uses `supertest` against the exported `app`)
- `node --test tests/users.test.js` — run a single test file
- `npm run lint` — check code style with ESLint

## Architecture

- `server.js` is the entry point: builds the Express `app`, mounts routers, and only calls `app.listen` when run directly (`require.main === module`), so tests can `require("../server")` and hit the app in-process via `supertest` without opening a real port.
- One route file per resource under `routes/` (`users.js`, `health.js`), each exporting an `express.Router()` mounted in `server.js`.
- All data access goes through `db/store.js`, a tiny in-memory module (data resets on every restart). Routes call its functions (`getAllUsers`, `getUserById`, `createUser`) rather than touching the `users` array directly.
- Config values (e.g. `PORT`) are read from `process.env`; `.env.example` documents the shape and real values would live in a git-ignored `.env`.

## Conventions
- Use res.status().json() for errors, not throw statements" (tells Claude what to do)
- Unused-argument lint warnings are suppressed for `req`, `res`, `next`, and `_`-prefixed names (see `.eslintrc.json`) — keep Express handler signatures as-is even when a param is unused.
