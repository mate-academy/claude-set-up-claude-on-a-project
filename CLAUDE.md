# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev    # start API with live reload on http://localhost:3000
npm test       # run all tests (Node built-in test runner)
npm run lint   # ESLint check
```

To run a single test file: `node --test tests/users.test.js`

## Architecture

`server.js` is the entry point — it mounts two routers and exports `app` without binding a port, so tests can import it directly without starting a server.

Routes live in `routes/`, one file per resource (`users.js`, `health.js`). Each route file is a standalone Express router.

All data access goes through `db/store.js`, which is an in-memory store (no persistence — data resets on restart). New routes should import from `db/store.js`, not manage their own state.

## Conventions

- One route file per resource in `routes/`; mount it in `server.js`
- Data mutations go through `db/store.js` functions, not inline in route handlers
- Tests use Node's built-in `node:test` runner with `supertest` for HTTP assertions
