# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Overview
This project is a real world application, in which newly learned Claude features can be tried out.
It is written in JavaScript and uses Express API calls against localhost.

## Commands

- `npm run dev` — start the API on http://localhost:3000 with auto-restart (`node --watch`)
- `npm test` — run the test suite (`node --test`, uses `node:test` + `supertest`)
- `npm test -- --test-name-pattern="<name>"` — run a single test by name
- `npm run lint` — run ESLint (`eslint:recommended`)

## Architecture

- `server.js` — builds and exports the Express `app`.
- `routes/` — one file per resource (`users.js`, `health.js`), each exporting an `express.Router()`, mounted in `server.js`.
- `db/store.js` — in-memory data access module. Data resets on every restart — there is no real database.

## Conventions

- Route handlers validate input and return JSON error bodies (`{ error: "..." }`) with the appropriate status code (400, 404) rather than throwing.
- Data access is never inlined in routes — always go through `db/store.js`, even for trivial in-memory operations.
