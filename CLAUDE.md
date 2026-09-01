# CLAUDE.md

A small Express REST API (`/users` CRUD-lite plus a `/health` check) used as the starter project for the Claude Code course.

## Commands

- `npm run dev` — start the API on http://localhost:3000 with auto-reload (`node --watch`)
- `npm test` — run the `node:test` + `supertest` suite in `tests/`
- `npm run lint` — run ESLint over the whole project
- `npm start` — start the API without watch mode

## Conventions

- Use CommonJS (`require` / `module.exports`), not ES module `import` / `export` — ESLint is configured for `sourceType: "script"`.
- Use double quotes and semicolons, matching the existing files.
- Read and write user data only through the `db/store.js` helpers; never import or mutate the `users` array directly.
- Return errors as JSON `{ error: "message" }` with an explicit status code (`400` for bad input, `404` for not found) — do not throw from route handlers.
- Keep `server.js` free of route logic: a new resource is a new file in `routes/` that is mounted in `server.js`.

## Architecture

- **`server.js`** — entry point. Builds the Express app, adds `express.json()`, mounts each router under its path, and calls `app.listen` only when run directly (`require.main === module`) so tests can `require("./server")` without opening a port.
- **`routes/`** — one file per resource (`users.js`, `health.js`). Each creates an `express.Router()`, defines its handlers, and exports the router.
- **`db/store.js`** — in-memory data store standing in for a database. Exposes `getAllUsers`, `getUserById`, `createUser`. Data resets on every restart.
- **`tests/`** — `node:test` specs that drive the imported `app` with `supertest`.
