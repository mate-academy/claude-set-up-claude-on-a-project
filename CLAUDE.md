# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

A minimal Express API (in-memory data, no database) used as the starter project for the Claude Code course.

## Commands

- `npm install` — install dependencies
- `npm run dev` — start the API on http://localhost:3000 with auto-restart (`node --watch`)
- `npm test` — run all tests (Node's built-in test runner + supertest); add `-- --test-name-pattern="<name>"` to run a single test
- `npm run lint` — check code style with ESLint

## Conventions

- One route file per resource in `routes/`, mounted in `server.js` (e.g. `routes/users.js` → `app.use("/users", usersRoutes)`). New resources follow the same pattern.
- Routes never touch data directly — all reads/writes go through `db/store.js`.
- Error responses are JSON with a single `error` key and the matching HTTP status (e.g. `res.status(404).json({ error: "User not found" })`).

## Architecture

- `server.js` is the entry point: builds the Express app, mounts routes, and only calls `app.listen` when run directly (`require.main === module`), so `tests/` can import `app` without opening a real port.
- `db/store.js` is a tiny in-memory data store — no persistence, resets on every restart. It's a stand-in for a real database.
- `tests/` uses Node's built-in `node:test` + `assert`, with `supertest` to make requests against the exported `app`.
