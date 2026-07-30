# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

Small Express API (users + health endpoints) backed by an in-memory store.

## Commands

- `npm run dev` — start the API with auto-reload (http://localhost:3000)
- `npm test` — run the test suite
- `npm run lint` — run ESLint

## Conventions

- Use CommonJS (`require`/`module.exports`), not ESM `import`/`export`.
- Access data through `db/store.js`, not by manipulating arrays directly in route files.

## Architecture

- `server.js` is the entry point; it mounts routers and starts the server.
- Each resource has its own route file in `routes/` (e.g. `users.js`).
- All data access goes through `db/store.js`.
