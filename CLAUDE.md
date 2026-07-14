# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this is

Starter Express (v4) REST API used as the practice project for the Claude Code course. Exposes a small `/users` resource plus a `/health` liveness check. There is no real database — data lives in memory and resets on restart.

## Commands

- `npm run dev` — run the API with `node --watch` (auto-reload) on `http://localhost:3000`
- `npm start` — run the API once, no watch
- `npm test` — run the test suite (`node --test`)
- `npm run lint` — ESLint over the whole project
- Run a single test file: `node --test tests/users.test.js`
- Filter tests by name: `node --test --test-name-pattern="returns 404"`

CI (`.github/workflows/ci.yml`) runs `npm run lint` then `npm test` on Node 22 for every push and PR — keep both green.

## Architecture

- `server.js` is the entry point. It builds the Express `app`, mounts routers, and **only calls `app.listen` when run directly** (`require.main === module`), exporting `app` otherwise. This lets tests import the app with `supertest` without opening a real port — preserve this pattern.
- One router file per resource under `routes/` (`users.js`, `health.js`), each mounted in `server.js` under its path prefix. Add a new resource by creating `routes/<name>.js` and mounting it there.
- All data access goes through `db/store.js`, the in-memory store. Routes must not hold their own state — go through the store's functions (`getAllUsers`, `getUserById`, `createUser`).

## Conventions

- CommonJS modules (`require` / `module.exports`), not ESM — `.eslintrc.json` sets `sourceType: "script"`.
- Use double quotes and semicolons, matching the existing files.
- ESLint's `no-unused-vars` is relaxed for `req`, `res`, `next`, and `_`-prefixed args; don't rename Express handler params to satisfy the linter.
