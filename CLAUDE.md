# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

This Project runs a server and runs tests against that server

## Commands

```bash
npm run dev     # start with file-watching (node --watch)
npm test        # run all tests (node --test)
npm run lint    # ESLint check
```

To run a single test file: `node --test tests/users.test.js`


## Architecture

- `server.js` — creates the Express app, mounts routes, exports `app` (starts listening only when run directly, so tests can import without opening a port)
- `routes/` — one file per resource; each exports an Express Router
- `db/store.js` — in-memory data store (resets on restart); the only place that touches data — routes call it, never manipulate data directly

## Conventions

- CommonJS (`require`/`module.exports`), not ES modules
- ESLint extends `eslint:recommended`; `req`, `res`, `next`, and `_`-prefixed args are exempt from `no-unused-vars`
- Tests use Node's built-in `node:test` + `node:assert` with `supertest` for HTTP assertions
