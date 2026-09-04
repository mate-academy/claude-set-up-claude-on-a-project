# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Description

Starter Express API for the Claude Code course projects — a minimal REST API with `/users` and `/health` endpoints, using an in-memory data store.

## Commands

- `npm run dev` — starts the API on http://localhost:3000 with file watching
- `npm test` — runs Node.js built-in tests (`node --test`)
- `npm run lint` — runs ESLint on the codebase
- `npm start` — starts the API without file watching

## Conventions

- **CommonJS modules** — use `require`/`module.exports`, not ES modules
- **Express router pattern** — one route file per resource in `routes/` (e.g., `users.js`, `health.js`)
- **Data access through `db/store.js`** — never access the `users` array directly from route handlers
- **Tests use `supertest`** — import `app` from `server.js` (which exports the Express app without starting the server when imported)

## Architecture

- **`server.js`** — entry point; creates Express app, mounts routers at `/users` and `/health`, exports `app` for testing, only listens on port when run directly (`require.main === module`)
- **`routes/users.js`** — REST endpoints for users: `GET /users`, `GET /users/:id`, `POST /users` (validates `name` and `email` required)
- **`routes/health.js`** — simple liveness check: `GET /health` returns `{ status: "ok" }`
- **`db/store.js`** — in-memory data store with `getAllUsers()`, `getUserById(id)`, `createUser({ name, email })`; data resets on server restart
- **`tests/users.test.js`** — sample tests covering health endpoint, user listing, 404 for missing user, 400 for invalid POST body
- **CI** (`.github/workflows/ci.yml`) — runs on push/PR: installs deps, runs lint, runs tests on Node 22

## Environment

- `.env.example` shows config shape; copy to `.env` for local overrides (git-ignored)
- `PORT` defaults to 3000 if not set
- `.claude/settings.local.json` is personal and git-ignored; shared permissions go in `.claude/settings.json`