# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

Express REST API for managing users with in-memory storage.

## Commands
- Run dev server: `npm run dev`
- Run test suite: `npm test`
- Run code linter: `npm run lint`

## Architecture
- `server.js` — Application entry point and server setup.
- `routes/` — Route handlers, one file per resource (e.g., `users.js`, `health.js`).
- `db/store.js` — Data access layer using a simple in-memory store.

## Conventions
- Use CommonJS syntax (`require`/`module.exports`), do not use ES modules (`import`/`export`).
- Ensure code passes `npm run lint` and all unit tests in `tests/` before committing.
