# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

Starter Express API (in-memory data, no database) used as a course sandbox for practicing Claude Code setup.

## Commands

- `npm run dev` — start the API with auto-reload on `http://localhost:3000`
- `npm test` — run the test suite (`node --test`, using supertest against the exported `app`)
- `npm run lint` — run ESLint
- `npm start` — start the API without auto-reload

## Conventions

- CommonJS only: `require`/`module.exports`, not ES module `import`/`export` (see `.eslintrc.json` `sourceType: "script"`).
- All data access goes through `db/store.js` — routes never touch the in-memory `users` array directly.
- Route handlers return errors as `{ error: "message" }` with the matching status code (400 for bad input, 404 for not found), not thrown exceptions.

## Architecture

- `server.js` is the entry point: builds the Express app, mounts routers, and only calls `app.listen` when run directly (`require.main === module`), so tests can `require("../server")` and hit the app in-memory without opening a port.
- One route file per resource under `routes/` (`users.js`, `health.js`), each exporting an `express.Router()` mounted in `server.js`.
- `db/store.js` is a tiny in-memory store standing in for a real database — data resets on every restart.
