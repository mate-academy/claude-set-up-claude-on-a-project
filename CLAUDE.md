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

- use `require`/`module.exports`
- not ES modules
- one route file per resource in `routes/` (e.g., `users.js`, `health.js`)
— never access the `users` array directly from route handlers

## Architecture

Request flow: client → `server.js` (Express app) → router in `routes/` → `db/store.js`. Data lives in memory only.

- **`server.js`** — app entry; mounts routers at `/users` and `/health`; exports `app` for tests; only binds a port when run directly (`require.main === module`)
- **`routes/users.js`** — `GET /users`, `GET /users/:id`, `POST /users`; validates `name` and `email` on POST
- **`routes/health.js`** — `GET /health` returns `{ status: "ok" }`
- **`db/store.js`** — in-memory store; exposes `getAllUsers`, `getUserById`, `createUser`; data resets on restart
- **`tests/users.test.js`** — pins the contract for health, user listing, 404 on missing user, 400 on invalid POST
- **CI** (`.github/workflows/ci.yml`) — installs deps, lints, and runs tests on Node 22

## Environment

- `.env.example` shows config shape; copy to `.env` for local overrides (git-ignored)
- `PORT` defaults to 3000 if not set
- `.claude/settings.local.json` is personal and git-ignored; shared permissions go in `.claude/settings.json`
