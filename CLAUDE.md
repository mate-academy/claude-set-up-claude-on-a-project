# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

Starter Express API for the Claude Code course projects.

## Commands

- `npm run dev` — start the server with auto-reload (`node --watch server.js`) on `http://localhost:3000`
- `npm start` — start the server without watch mode
- `npm test` — run all tests (`node --test`)
- `npx node --test tests/users.test.js` — run a single test file
- `npm run lint` — run ESLint

## Conventions

- Try to produce compact code
- Explain the code for a developer not familiar with the express framework

## Architecture

- `server.js` is the entry point: builds the Express `app`, mounts route modules, and only calls `app.listen()` when run directly (`require.main === module`). This lets `tests/` `require("../server")` and drive the app with `supertest` (no real port opened).
- Each resource gets one router file under `routes/` (`users.js`, `health.js`), mounted in `server.js` under its path prefix (e.g. `routes/users.js` → `/users`).
- `db/store.js` is an in-memory stand-in for a real database — data resets on every server restart. Routes never touch data directly; they go through this module's functions (`getAllUsers`, `getUserById`, `createUser`).
- Config goes through environment variables (see `.env.example`); `PORT` defaults to 3000. Real secrets would live in a git-ignored `.env`, never committed.
