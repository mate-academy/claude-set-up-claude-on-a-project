# CLAUDE.md
# Project: A starter Express API for user management and health checks, used as the foundation for the Claude Code course.

## Commands

- `npm run dev` — start the API with auto-reload on http://localhost:3000
- `npm start` — start the API without auto-reload
- `npm test` — run all tests (Node's built-in test runner + supertest)
- `npm test -- --test-name-pattern="<name>"` — run a single test by name
- `npm run lint` — check code style with ESLint

## Architecture

- `server.js` is the entry point. It builds the Express app, mounts route modules, and only calls `app.listen()` when run directly (`require.main === module`) — this lets `tests/*.test.js` `require("../server")` and exercise the app with supertest without opening a real port.
- Routes live under `routes/`, one file per resource (`users.js`, `health.js`), each exporting an Express `Router` mounted in `server.js`.
- All data access goes through `db/store.js`, a single in-memory store (a plain array, no persistence — it resets on every restart). Routes call its functions (`getAllUsers`, `getUserById`, `createUser`) rather than touching the array directly.
- Tests (`tests/`) import the exported `app` and hit routes directly via supertest; there's no separate running server for tests.

## Conventions

- Use `require`/`module.exports` (CommonJS), not ES module `import`/`export` — see `package.json` (no `"type": "module"`) and `.eslintrc.json` (`sourceType: "script"`).
- Add new data access functions to `db/store.js` rather than manipulating the in-memory array from route handlers directly.
