# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

A small Express API (course starter project) for practicing Claude Code setup — not the focus of feature work itself.

## Commands

- `npm run dev` — start the API with auto-reload (http://localhost:3000)
- `npm test` — run tests (`node --test`, using `supertest`)
- `npm run lint` — run ESLint
- `node --test tests/users.test.js` — run a single test file

## Architecture

- `server.js` — app entry point; mounts routers and starts the server (only listens when run directly, so `tests/` can import `app` without opening a port)
- `routes/` — one file per resource (`users.js`, `health.js`), each exporting an Express `Router`
- `db/store.js` — in-memory data store; all data access goes through its exported functions (`getAllUsers`, `getUserById`, `createUser`); data resets on restart
- `tests/` — route-level tests using `supertest` against the exported `app`

## Conventions

- Route handlers read/write data only through `db/store.js`, never by touching module-level state directly.
- Unused-argument lint exceptions are limited to `_`, `req`, `res`, `next` (see `.eslintrc.json`); other unused vars are lint errors.
