# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

Starter Express API for the Claude Code course. It's a small, deliberately minimal app used as a
sandbox for practicing Claude Code setup (CLAUDE.md, permissions) — not for building out features.

## Commands

- `npm install` — install dependencies
- `npm run dev` — start the API on http://localhost:3000 (auto-restarts via `node --watch`)
- `npm test` — run all tests (Node's built-in test runner + supertest)
- `npm test -- --test-name-pattern="GET /health"` — run a single test by name
- `npm run lint` — check code style with ESLint

CI (`.github/workflows/ci.yml`) runs `npm install`, `npm run lint`, and `npm test` on every push/PR.

## Architecture

- `server.js` — app entry point; wires up middleware and mounts routers. Exports the `app`
  instance without calling `listen()` when required elsewhere, so tests can import it and drive
  it with supertest against an in-process server rather than a real port.
- `routes/` — one file per resource (`users.js`, `health.js`), each exporting an Express `Router`.
- `db/store.js` — in-memory data store standing in for a real database. State resets on every
  server restart; do not add persistence here without discussing it first, since the whole point
  of this project is to stay easy to run with zero setup.
- `tests/` — integration tests that import `app` from `server.js` and issue real HTTP requests via
  supertest, rather than unit-testing route handlers directly.

## Conventions

- Route handlers validate input and return JSON error bodies (`{ error: "..." }`) with the
  appropriate status code (400, 404) rather than throwing.
- Config values (e.g. `PORT`) are read from `process.env` with fallbacks in `server.js`; real
  secrets belong in a git-ignored `.env`, never committed (`.env.example` documents the shape).
