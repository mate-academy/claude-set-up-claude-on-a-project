# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

Starter Express API for the Claude Code course: a minimal in-memory users API used to practice setting up Claude Code, not a project to add features to.

## Commands

- `npm run dev` - start the API on http://localhost:3000 with auto-restart (`node --watch`)
- `npm test` - run all tests (Node's built-in test runner, not Jest/Mocha)
- `node --test tests/users.test.js` - run a single test file
- `node --test --test-name-pattern="404"` - run tests matching a name pattern
- `npm run lint` - run ESLint (`eslint:recommended`)

## Architecture

- `server.js` - creates the Express app, mounts routes, and only calls `app.listen` when run directly (`require.main === module`). `module.exports = app` so tests can import it with supertest without opening a real port.
- `routes/` - one router file per resource (`users.js`, `health.js`), mounted in `server.js` under `/users` and `/health`.
- `db/store.js` - in-memory data access layer; routes call into it instead of holding data themselves. Data resets on every restart (no persistence).
- `tests/` - supertest against the exported `app`, using Node's built-in `node:test` and `node:assert`.

## Conventions

- Double quotes, semicolons, 2-space indentation (see existing files for style).
- ESLint ignores unused `req`, `res`, `next`, and `_`-prefixed args (`.eslintrc.json`) - keep Express handler signatures as-is even when a param is unused.
- Real secrets go in `.env` (git-ignored); `.env.example` documents the shape only.
