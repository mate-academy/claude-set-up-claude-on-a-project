# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Overview

A minimal Express REST API (users + health endpoints) backed by an in-memory data store. Course-starter scaffold — no real database.

## Commands

- `npm install` — install dependencies
- `npm run dev` — run the server with auto-reload (`node --watch`) on http://localhost:3000
- `npm start` — run the server without auto-reload
- `npm test` — run all tests (Node's built-in test runner + supertest); run a single file with `node --test tests/users.test.js`
- `npm run lint` — run ESLint
- `curl http://localhost:3000/health` — quick manual smoke test against a running server (requires `npm run dev`/`npm start` in another terminal)

## Architecture

- `server.js` — entry point. Builds the Express app, applies `express.json()`, mounts one router per resource, and exports `app` without starting it when required (guarded by `require.main === module`) so tests can import it headlessly instead of binding a real port.
- `routes/*.js` — one router file per resource (e.g. `users.js`, `health.js`); request handlers live directly in the router, there is no separate controller/model layer.
- `db/store.js` — the only data-access layer; routers call into it rather than reading/writing arrays themselves. Data is in-memory and resets on restart.
- `tests/*.js` — one test file per resource (e.g. `users.test.js`); uses supertest to make real HTTP requests against the exported `app` without binding a port.

## Conventions

- CommonJS throughout (`require` / `module.exports`) — not ESM.
- Adding a resource means: a new router file in `routes/` mounted in `server.js`, plus corresponding functions added to `db/store.js` — don't manipulate data arrays directly from route handlers.
