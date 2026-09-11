# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

Starter Express API for the Claude Code course projects.

## Commands

- `npm run dev` — start the API with auto-reload on `http://localhost:3000`
- `npm test` — run all tests (`node --test`)
- `node --test tests/users.test.js` — run a single test file
- `npm run lint` — check code style with ESLint

## Conventions

- Use `require`/`module.exports` (CommonJS), not ESM `import`/`export` — `package.json` has no `"type": "module"`.
- One route file per resource under `routes/` (e.g. `users.js`, `health.js`), mounted in `server.js`.
- Route handlers talk to data only through `db/store.js`, never by manipulating data directly.

## Architecture

- `server.js` is the entry point: builds the Express app, mounts each router from `routes/`, and only calls `app.listen` when run directly (`require.main === module`) so `tests/` can `require("../server")` and drive it with `supertest` against an app that never opens a real port.
- `db/store.js` is an in-memory data store standing in for a real database — data resets on every server restart. All persistence goes through its exported functions.
- CI (`.github/workflows/ci.yml`) runs `npm install`, `npm run lint`, `npm test` on Node 22 for every push/PR.
