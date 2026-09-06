# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

A minimal Express API (users + health check) backed by an in-memory store. Used as the starter project for the Claude Code course — the app itself is not the point of the exercise.

## Commands

- `npm run dev` — start the API with auto-reload (`node --watch server.js`) on `http://localhost:3000`
- `npm test` — run the test suite (`node --test`, uses `supertest` against the exported `app`)
- `npm run lint` — run ESLint (`eslint:recommended` config in `.eslintrc.json`)
- `npm start` — start the API without auto-reload

There is no test filter flag configured; `node --test` runs everything in `tests/`.

## Architecture

- `server.js` — entry point; builds the Express app, mounts routers, and only calls `.listen()` when run directly (`require.main === module`), so `tests/` can import `app` without opening a real port.
- `routes/` — one router file per resource (`users.js`, `health.js`), mounted in `server.js` under a matching path prefix.
- `db/store.js` — in-memory data access layer; all data resets on server restart. Routes call into this module rather than touching data directly.

## Conventions

- Use `require`/`module.exports` (CommonJS), not ESM `import`/`export`.
- Route handlers validate input and return JSON error bodies (e.g. `{ error: "..." }`) with the appropriate status code (400, 404) rather than throwing.
