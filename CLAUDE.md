# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

A small Express REST API (users + health check) backed by an in-memory store. It is the starter repo for a Claude Code course.

## Commands

- `npm run dev`: start the API on http://localhost:3000 with `node --watch` (port comes from `PORT`)
- `npm test`: run all tests with Node's built-in runner (`node --test`)
- `node --test --test-name-pattern="404" tests/users.test.js`: run a single test by name
- `npm run lint`: ESLint (`eslint:recommended`, ESLint 8 legacy `.eslintrc.json`)

CI (`.github/workflows/ci.yml`) runs `npm run lint` then `npm test` on Node 22. Both must pass.

## Conventions

- Use one `express.Router()` file per resource in `routes/`, mounted in `server.js`. Don't define routes in `server.js`.
- Routes access data only through functions exported from `db/store.js`, never by touching the arrays directly.
- Write tests with `node:test`, `node:assert` and `supertest` against the exported `app`. Don't add Jest or Mocha.
- Unused-var lint warnings are suppressed only for args named `_`, `req`, `res` or `next`.

## Architecture

- `server.js` builds the app, adds `express.json()`, and mounts routers (`/users`, `/health`). It only calls `listen()` when `require.main === module`, and always exports `app`. That is how tests run without opening a port, so keep it that way.
- `db/store.js` is module-level in-memory state. It is seeded with two users (ids 1 and 2), and ids auto-increment from 3. Nothing persists across restarts. State is also shared across all tests in the same process, so tests must not assume a fresh store.
- one route file per resource in `routes/`
- Secrets/config go in `.env` (git-ignored). See `.env.example`. Never read or commit `.env`.
