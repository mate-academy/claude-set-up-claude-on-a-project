# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

A small Express REST API (users + health) used as the practice codebase for the Claude Code course.

## Commands

- `npm run dev` — start the API with auto-reload on http://localhost:3000
- `npm test` — run the test suite (Node's built-in `node --test` runner)
- `npm run lint` — check code style with ESLint
- Run a single test file: `node --test tests/users.test.js`

CI (`.github/workflows/ci.yml`) runs `npm run lint` then `npm test` on Node 22 for every push and PR — both must pass.

## Conventions

- Use CommonJS (`require` / `module.exports`), not ES module `import`. `.eslintrc.json` sets `sourceType: "script"`.
- Use double quotes and semicolons, matching the existing files.
- All data access goes through `db/store.js` — routes never hold state directly.
- One route file per resource in `routes/`, each exporting an `express.Router()`.
- Return errors as `res.status(<code>).json({ error: "..." })` and validate required fields in the route before touching the store (see `routes/users.js`).

## Architecture

- `server.js` is the entry point: builds the Express app, mounts routers under their base paths (`/users`, `/health`), and only calls `app.listen` when run directly (`require.main === module`) — this lets tests `require("../server")` and drive the app with `supertest` without opening a port.
- `routes/*.js` define HTTP handlers per resource and delegate to the store.
- `db/store.js` is an in-memory store (a plain array + `nextId` counter) standing in for a database. Data resets on every restart, so tests can assume the two seeded users exist.
