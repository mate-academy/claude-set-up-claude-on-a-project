# CLAUDE.md
Minimal in-memory Express API used as the starter project for the Claude Code course (the app code isn't the point — see README.md for the actual assignment: setting up CLAUDE.md and .claude/settings.json).

## Commands

- `npm install` — install dependencies
- `npm run dev` — start the API with file-watch reload on http://localhost:3000
- `npm start` — start the API without watch mode
- `npm test` — run all tests (Node's built-in `node:test` runner)
- `node --test tests/users.test.js` — run a single test file
- `npm run lint` — run ESLint

## Architecture

- `server.js` — creates and configures the Express `app`, mounts route modules, and only calls `app.listen()` when run directly (`require.main === module`). This lets `tests/*.test.js` `require("../server")` and hit the app with `supertest` without opening a real port.
- `routes/` — one file per resource (`users.js`, `health.js`), each exporting an `express.Router()`. Add new resources the same way and mount them in `server.js`.
- `db/store.js` — the only place data is read or written. It's an in-memory array standing in for a real database; state resets on every restart. Route handlers should never manipulate the `users` array directly — go through this module's exported functions.

## Conventions

- Use double quotes and semicolons, not single quotes or omitted semicolons.
- Use ESLint's `eslint:recommended` rules, not custom overrides — resolve unused-variable warnings rather than disabling them, except for the exempted Express middleware params (`req`/`res`/`next`).
