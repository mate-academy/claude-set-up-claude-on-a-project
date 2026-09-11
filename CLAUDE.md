# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.


## Commands

- `npm run dev` — start the API with auto-reload (`node --watch server.js`) on `http://localhost:3000`
- `npm start` — start the API without auto-reload
- `npm test` — run all tests (`node --test`, using `node:test` + `supertest`)
- `npm test -- --test-name-pattern="POST /users"` — run a single test by name
- `npm run lint` — check code style with ESLint

## Conventions

- Use `require`/`module.exports` (CommonJS), not ES module `import`/`export` — `package.json` has no `"type": "module"`.
- One route file per resource in `routes/`, mounted in `server.js` (e.g. `routes/users.js` → `app.use("/users", usersRoutes)`). Add new resources the same way rather than growing an existing route file.
- Routes never touch data directly — all reads/writes go through `db/store.js`. Add new store functions there instead of mutating the `users` array from a route.
- ESLint ignores unused `req`, `res`, `next`, and `_`-prefixed args (see `.eslintrc.json`); don't rename handler params to work around lint warnings.

## Architecture

- `server.js` is the entry point: builds the Express `app`, mounts route modules, and only calls `app.listen` when run directly (`require.main === module`), so `tests/*.test.js` can `require("../server")` and drive it with `supertest` without opening a real port.
- `db/store.js` is a tiny in-memory data layer (plain arrays, no persistence — resets on every restart). It stands in for a real database; this is a course starter, not production code.
- Real config belongs in a git-ignored `.env` (see `.env.example` for the shape); no secrets currently in use by the app itself.
