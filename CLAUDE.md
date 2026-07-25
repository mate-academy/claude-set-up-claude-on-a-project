# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Overview

Starter Express API for the Claude Code course projects — a minimal REST API backed by an in-memory data store.

## Commands

- `npm run dev` — start the API with auto-reload on http://localhost:3000
- `npm start` — start the API without auto-reload
- `npm test` — run all tests (Node's built-in test runner)
- `node --test tests/users.test.js` — run a single test file
- `npm run lint` — check code style with ESLint

## Architecture

- `server.js` — Express app entry point; mounts routes and only calls `app.listen` when run directly, so tests can `require` the app without opening a real port
- `routes/` — one file per resource (`users.js`, `health.js`), each exporting an Express `Router`
- `db/store.js` — in-memory data access layer; no persistence, data resets on every restart
- `tests/` — uses `node:test` + `supertest` against the exported `app`

## Conventions

- CommonJS modules (`require` / `module.exports`), not ES modules
- Route handlers validate input and return JSON error bodies (`{ error: "..." }`) with appropriate status codes (400, 404)

CI (`.github/workflows/ci.yml`) runs `npm run lint` and `npm test` on every push and pull request.
