# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

A minimal Express REST API used as a teaching project for Claude Code course exercises.

## Commands

```bash
npm run dev   # start server with hot-reload on http://localhost:3000
npm test      # run all tests (Node built-in test runner)
npm run lint  # ESLint check
```

To run a single test file: `node --test tests/users.test.js`

## Architecture

- `server.js` — entry point; mounts routers and exports `app` for tests (does not bind a port when imported)
- `routes/` — one file per resource (`users.js`, `health.js`); each exports an Express Router
- `db/store.js` — in-memory data layer; all routes access data through its exported functions (`getAllUsers`, `getUserById`, `createUser`); data resets on server restart

## Conventions

- Use CommonJS (`require`/`module.exports`), not ES modules — `sourceType` is set to `"script"` in ESLint config
- Route files must not import each other; shared data access goes through `db/store.js`
- Route handler args named `req`/`res`/`next` are exempt from the `no-unused-vars` rule; other unused vars produce a warning
