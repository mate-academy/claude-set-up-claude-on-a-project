# CLAUDE.md

A minimal Express REST API (course starter project) exposing `/users` and `/health` over an in-memory data store.

## Commands

- `npm run dev` — start the API with auto-reload (`node --watch server.js`) on `http://localhost:3000`
- `npm start` — start the API without auto-reload
- `npm test` — run all tests (Node's built-in `node:test` runner)
- `node --test tests/users.test.js` — run a single test file
- `npm run lint` — run ESLint (`eslint:recommended`, Node/CommonJS env)

CI (`.github/workflows/ci.yml`) runs `npm install`, `npm run lint`, and `npm test` on every push/PR.

## Conventions

- Use require, not import
- routes/users.js never touches the users array directly

## Architecture

- `server.js` — creates the Express app, mounts route modules, and exports `app`. It only calls `app.listen()` when run directly (`require.main === module`), so `tests/*.test.js` can `require("../server")` and drive it with `supertest` against an in-memory instance instead of a real port.
- `routes/` — one file per resource (`users.js`, `health.js`), each exporting an `express.Router()` mounted in `server.js`. New resources should follow this same one-file-per-router pattern.
- `db/store.js` — the only place that touches data. Routes call its functions (`getAllUsers`, `getUserById`, `createUser`) rather than manipulating state directly. Data is a plain in-memory array that resets on every restart — there is no real database.
- `.env` (git-ignored; see `.env.example`) would hold real config/secrets if this grew beyond the starter stage; currently only `PORT` is used.
