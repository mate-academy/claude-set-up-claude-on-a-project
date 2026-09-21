# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

A small Express API (`claude-course-starter`) with an in-memory data store, used as a course starter project. No real database or persistence.

## Commands

- `npm run dev` — start the API on http://localhost:3000 with auto-reload (`node --watch server.js`)
- `npm test` — run the test suite (`node --test`, using `supertest` against the exported `app`)
- `npm run lint` — run ESLint (`eslint:recommended`, flat config in `.eslintrc.json`)

## Conventions

- Use `require`/`module.exports` (CommonJS), not ES module `import`/`export` — `package.json` has no `"type": "module"` and `.eslintrc.json` sets `"sourceType": "script"`.
- One route file per resource under `routes/` (e.g. `users.js`, `health.js`), mounted in `server.js` — add new resources the same way rather than adding routes directly to `server.js`.
- Access data only through `db/store.js`'s exported functions (`getAllUsers`, `getUserById`, `createUser`) — don't reach into its module-level `users` array from route handlers.

## Architecture

- `server.js` is the entry point: builds the Express app, mounts `routes/users.js` at `/users` and `routes/health.js` at `/health`, and only calls `app.listen` when run directly (`require.main === module`) so tests can import `app` without opening a port.
- `db/store.js` is a tiny in-memory store standing in for a real database — data resets on every restart.
- `tests/users.test.js` uses Node's built-in test runner (`node:test`) plus `supertest` to exercise the routes through the exported `app`.
