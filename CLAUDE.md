# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

A minimal Express REST API used as a learning project for Claude Code course exercises.

## Commands

```
npm install       # install dependencies
npm run dev       # start with file-watching (node --watch) on http://localhost:3000
npm test          # run all tests with Node's built-in test runner
npm run lint      # check code style with ESLint
```

Run a single test by name pattern: `node --test --test-name-pattern "GET /health"`.

## Conventions

- Use CommonJS (`require`/`module.exports`), not ES modules — `package.json` has no `"type": "module"`.
- Tests use Node's built-in `node:test` and `node:assert` modules plus `supertest`; do not introduce Jest or Mocha.
- Route handlers validate required fields and return structured JSON errors (`{ error: "..." }`) with the appropriate HTTP status code before touching the store.
- ESLint extends `eslint:recommended`; `req`, `res`, `next`, and names prefixed with `_` are exempt from the `no-unused-vars` rule.
- Environment config goes in `.env` (git-ignored); use `.env.example` as the template. Never commit real secrets.

## Architecture

- `server.js` — entry point; mounts routes and exports `app` without binding a port, so tests can import it cleanly.
- `routes/` — one file per resource (`users.js`, `health.js`); each file is an Express Router mounted in `server.js`.
- `db/store.js` — in-memory data layer (no real database); data resets on each server restart. All route files go through this module, never manipulating the array directly.
