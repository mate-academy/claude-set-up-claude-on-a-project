# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

- `npm run dev` — start the API on http://localhost:3100 with auto-reload (`node --watch`)
- `npm test` — run the full test suite (Node's built-in `node --test`)
- `npm run lint` — ESLint over the repo

## Conventions

- CommonJS only (`require` / `module.exports`). ESLint is configured with `sourceType: "script"`, so do not introduce `import`/`export` syntax.
- One route file per resource under `routes/`, each exporting an `express.Router()`, mounted in `server.js`. Add a new resource by creating `routes/<name>.js` and an `app.use("/<name>", ...)` line.
- Routes never touch data directly — all reads and writes go through the helpers in `db/store.js`.

## Architecture

- `db/store.js` is an in-memory array standing in for a database; data resets on every restart and is not persisted.
- `server.js` only calls `app.listen()` when run directly (`require.main === module`) and otherwise exports `app`, so tests can import it with `supertest` without binding a port.
