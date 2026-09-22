# CLAUDE.md

A small Express REST API serving users and a health check, backed by an in-memory store.

## Commands

| Command | What it does |
|---|---|
| `npm run dev` | Starts the API on http://localhost:3000 with `--watch` (auto-restart) |
| `npm test` | Runs the suite with the built-in `node --test` runner |
| `npm run lint` | Runs ESLint over the repo |

Run `npm test` and `npm run lint` before proposing a commit.

## Conventions

- **CommonJS, not ESM.** Use `require` and `module.exports`. ESLint is set to `sourceType: "script"`, so `import`/`export` fails the lint.
- **Route files never touch data directly.** They call `db/store.js`. A new query goes in `store.js` and is exported from there, not written inline in a route.
- **Errors return JSON with an explicit status**, in the shape `{ error: "message" }` — `res.status(404).json({ error: "User not found" })`. A successful create returns `201`.
- **Tests use `node:test` plus `supertest`**, importing `app` from `server.js`. Never call `app.listen` in a test: `server.js` only listens when run directly, and tests depend on that.
- **Style:** double quotes and semicolons, matching the existing files.

## Architecture

`server.js` is the entry point. It creates the app, registers `express.json()`, mounts one router per resource (`/users`, `/health`), and exports the app. It calls `listen` only when run directly, guarded by `require.main === module`, so tests can import it without opening a port.

`routes/` holds one file per resource, each exporting an `express.Router`. A new resource means a new file there plus one `app.use` line in `server.js`.

`db/store.js` is the only data access layer. It is an in-memory array, so **data resets on every restart** and ids come from a module-level counter, not from a database.
