# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

A minimal Express REST API (users + health endpoints) with an in-memory store, used as the starter project for the Claude Code course.

## Commands

- `npm run dev` — start the API with auto-restart on file changes (http://localhost:3000)
- `npm start` — start the API without watch mode
- `npm test` — run all tests (Node's built-in test runner + Supertest)
- `node --test tests/users.test.js` — run a single test file
- `npm run lint` — run ESLint

## Conventions

- Double-quoted strings and CommonJS (`require`/`module.exports`), not ESM `import`/`export`.
- Unused-var lint rule ignores `req`, `res`, `next`, and any `_`-prefixed name — don't rename handler params just to silence lint.

## Architecture

- `server.js` is the entry point; it builds the Express `app`, mounts routers, and only calls `app.listen` when run directly (`require.main === module`), so `tests/` can import `app` and drive it with Supertest without opening a real port.
- `routes/` has one router file per resource (`users.js`, `health.js`), mounted in `server.js` under their path prefix.
- `db/store.js` is the only data access layer — an in-memory array wrapped in getter/create functions. Data resets on every restart; there is no real database. Routes call into `store.js` rather than touching the array directly.
