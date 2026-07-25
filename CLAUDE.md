# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

This project is test to complete hands on assignment for claude code 

## Commands

```bash
npm run dev       # start API on http://localhost:3000 (node --watch, auto-restarts)
npm test          # run all tests (Node built-in test runner)
npm run lint      # ESLint check
```

Run a single test file:
```bash
node --test tests/users.test.js
```

Run tests matching a name pattern:
```bash
node --test --test-name-pattern "GET /users"
```

## Conventions 
- TypeScript strict; no `any`
- On failure, throw AppError - never return null
- All API responses go through formatResponse()

## Architecture

**Request flow:** `server.js` → `routes/<resource>.js` → `db/store.js`

- `server.js` mounts routers and exports `app` without calling `app.listen()` when imported as a module (guarded by `require.main === module`). This lets tests import the app cleanly via supertest without binding a real port.
- `routes/` — one Express Router per resource. Add new resources by creating a file here and mounting it in `server.js`.
- `db/store.js` — in-memory store; data resets on every server restart. It stands in for a real database. All persistence logic lives here.


