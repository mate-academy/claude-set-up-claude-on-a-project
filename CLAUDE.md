# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

A small Express.js REST API with an in-memory data store (no real database).

## Commands

- `npm run dev` — start with auto-restart on http://localhost:3000
- `npm test` — run all tests (`node --test tests/users.test.js` for a single file)
- `npm run lint` — run ESLint

## Architecture

- `server.js` exports `app` without calling `.listen()` when required, so tests drive it directly with supertest instead of a real port.
- `routes/` — one router file per resource, mounted in `server.js`.
- `db/store.js` — in-memory store; not persisted, resets on restart.

## Conventions

- Routes: call db/store.js for reads/writes, not direct data access.
- New resources: create their own router file in routes/, not inline routes in server.js — follow the pattern in routes/users.js
- use Hungarian notation for variables, not camelCase
