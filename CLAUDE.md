# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

Starter Express API for the Claude Code course. CRUD endpoints for users and a health check, backed by an in-memory data store. No real database—it resets on server restart.

## Commands

```bash
npm run dev      # Start server with auto-reload on file changes (http://localhost:3000)
npm test         # Run all tests (Node's built-in test framework + supertest)
npm run lint     # Check code style with ESLint
```

Single test: `node --test tests/users.test.js`

## Conventions

**Route structure**: One route file per resource in `/routes/`. Keep route handlers thin; push logic to `db/store.js` or shared helpers.

**Data access**: All database operations go through `db/store.js`. Don't query users directly in route handlers—use the store's public API (`getAllUsers`, `getUserById`, `createUser`). This keeps the layer boundary clear.

**Input validation**: Validate required fields in route handlers before calling the store. Return 400 with a clear error message if validation fails.

## Architecture

- `server.js` — Entry point. Exports the Express app (enables test imports without starting a real server). Listens on `PORT` env var, defaults to 3000.
- `routes/` — Resource-based routing. `users.js` handles GET, GET /:id, and POST for users.
- `db/store.js` — In-memory data layer. Exports functions (`getAllUsers`, `getUserById`, `createUser`). Maintains the `users` array and `nextId` counter.
- `tests/` — Node test framework + supertest. Tests import the app from `server.js` so they don't open a real port.

For production, replace `db/store.js` with a real database client (e.g., PostgreSQL) while keeping the same export interface.
