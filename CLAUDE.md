# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

A small Express API (in-memory data, no database) used as a course starter project.

## Commands

- `npm run dev` — start the API on http://localhost:3000 with auto-restart on changes
- `npm test` — run the tests in `tests/` (Node's built-in test runner)
- `npm run lint` — run ESLint over the project
- `npm test -- --test-name-pattern="<name>"` — run a single test by name

## Conventions

- Use `require`/`module.exports` (CommonJS), not ES modules — matches `"sourceType": "script"` in `.eslintrc.json`. E.g. Use CommonJS require /module.exports and not the ES module import /export

- One route file per resource under `routes/` (e.g. `users.js`, `health.js`), mounted in `server.js`.
- Route handlers call into `db/store.js` for data access rather than manipulating the in-memory arrays directly.

## Architecture

- `server.js` is the entry point: builds the Express app, mounts route modules, and only calls `app.listen` when run directly (`require.main === module`), so `tests/` can import `app` without opening a port.
- `db/store.js` is a tiny in-memory data store standing in for a real database; data resets on every restart.
- `routes/` holds one file per resource; each exports an `express.Router()`.
