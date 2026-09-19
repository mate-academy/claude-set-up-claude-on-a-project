# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

A lightweight Express.js API starter: REST endpoints for managing users and a health check, backed by an in-memory data store.

## Commands

- `npm run dev` — Start the API with auto-reload on file changes (listens on `http://localhost:3000`)
- `npm test` — Run integration tests using Node's test framework; tests import the Express app directly
- `npm run lint` — Check code style with ESLint

## Conventions

- **Routes are organized by resource**: one route file per resource in `routes/` (e.g., `routes/users.js`)
- **All data access goes through `db/store.js`**: the single in-memory store with `getAllUsers()`, `getUserById()`, `createUser()`
- **The server exports the Express app separately from startup**: `server.js` exports `app` for tests, and only calls `app.listen()` when run directly; this pattern lets tests import and use the app without opening a real port
- **Tests use Node's native test framework and supertest**: no Jest, no mocking of the store — tests make real HTTP calls via supertest

## Architecture

- `server.js` — Express app configuration and module routes
- `routes/` — Request handlers by resource
- `db/store.js` — In-memory user data store (not persisted)
- `tests/` — Integration tests that call the API endpoints
