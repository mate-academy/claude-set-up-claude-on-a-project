# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

A small Express API (starter project for the Claude Code course). It is not meant to grow real features — the app code exists so there's something real to set up Claude Code against.

## Commands

- `npm run dev` — start the API on http://localhost:3000 with auto-reload
- `npm test` — run all tests (Node's built-in test runner + Supertest)
- `node --test tests/users.test.js` — run a single test file
- `npm run lint` — check code style with ESLint

CI (`.github/workflows/ci.yml`) runs `npm install`, `npm run lint`, and `npm test` on every push and PR.

## Conventions

- Use `require`/`module.exports` (CommonJS), not ES module `import`/`export`.
- Double quotes for strings.
- One route file per resource under `routes/`, mounted in `server.js` (e.g. `routes/users.js` → `app.use("/users", usersRoutes)`).
- Route handlers validate input and return JSON error bodies (`{ error: "..." }`) with the appropriate status code (400, 404) rather than throwing.

## Architecture

- `server.js` is the entry point: builds the Express app, mounts routers, and only calls `app.listen` when run directly (`require.main === module`) — this lets `tests/` import `app` and drive it with Supertest without opening a real port.
- `routes/` holds one router per resource; handlers call into `db/store.js` for data instead of touching state directly.
- `db/store.js` is an in-memory data store standing in for a real database — data resets on every restart. Treat it as the single data-access layer; don't add a second one.
