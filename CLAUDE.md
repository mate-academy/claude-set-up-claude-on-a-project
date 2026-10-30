# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

Starter Express API (CommonJS, Node 22) with an in-memory user store; used as a base for Claude Code course projects.

## Commands

- `npm run dev` — start with `node --watch` on http://localhost:3000 (`PORT` overridable via `.env`, see `.env.example`)
- `npm test` — runs `node --test` (built-in Node runner, not Jest/Mocha) with supertest
- Single test file: `node --test tests/users.test.js`; single test: `node --test --test-name-pattern="<name>"`
- `npm run lint` — ESLint 8 (legacy `.eslintrc.json`, `eslint:recommended`)
- CI (`.github/workflows/ci.yml`) runs lint then tests; both must pass.

## Architecture

- `server.js` builds the Express app, mounts routers (`/users`, `/health`), and exports `app`. It only calls `listen` when run directly (`require.main === module`), so tests import `app` without opening a port — keep it that way.
- `routes/` — one router file per resource, mounted in `server.js`.
- `db/store.js` — in-memory data layer standing in for a database; state resets on restart. Routes access data only through its exported functions, never directly.
- `tests/` — supertest against the exported `app`. Note the store is module-level state shared across tests in a process.

## Conventions

- CommonJS (`require`/`module.exports`), not ESM (`sourceType: "script"`).
- Errors are returned as `res.status(code).json({ error: "message" })`.
- New resources: add a `routes/<resource>.js` router and mount it in `server.js`; add tests under `tests/`.
- Use german languale for new variables

