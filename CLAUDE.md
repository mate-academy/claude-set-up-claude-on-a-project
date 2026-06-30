# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

A starter Express REST API used as the base project for a Claude Code course.

## Architecture

`server.js` is the entry point — it wires up routes and exports `app` without binding a port, so tests can import it directly.

Routes live in `routes/`, one file per resource (`users.js`, `health.js`). Each file creates an Express `Router` and exports it.

All data access goes through `db/store.js`, which is a plain in-memory array. Data resets on every server restart — there is no database.

## Commands

```bash
npm install          # install dependencies
npm run dev          # start server with auto-reload on http://localhost:3000
npm test             # run all tests
npm run lint         # check code style

# Run a single test file
node --test tests/users.test.js

# Run tests matching a name pattern
node --test --test-name-pattern "GET /health"

## Conventions

- CommonJS throughout (`require` / `module.exports`); do not use ES module syntax.
- Add new resources as a new file in `routes/` and mount it in `server.js` — do not add routes directly to the app in `server.js`.
- Access data only through `db/store.js` functions; do not read or mutate the in-memory arrays from route files.
- Tests use Node's built-in `node:test` runner with `supertest` — do not introduce Jest or other test frameworks.
- Real secrets go in `.env` (git-ignored); use `.env.example` to document required variables.
