# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

A minimal Express REST API for users, used as a course project for setting up Claude Code.

## Commands

```bash
npm install        # install dependencies
npm run dev        # start with auto-reload (node --watch)
npm test           # run all tests (Node built-in test runner)
npm run lint       # ESLint check
```

To run a single test file: `node --test tests/users.test.js`

## Architecture

- `server.js` — Express app entry point; mounts routes and exports `app` for tests (does not open a port when imported)
- `routes/` — one file per resource (`users.js`, `health.js`), each exports an Express Router
- `db/store.js` — in-memory data layer; all data access goes through its exported functions; data resets on server restart

## Conventions

- Use CommonJS (`require`/`module.exports`), not ES modules
- Tests use Node's built-in `node:test` + `assert` with `supertest` — no external test framework
- Unused function args named `req`, `res`, `next`, or starting with `_` are allowed by ESLint (intentional suppression)
