# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

A minimal Express API (course starter) with an in-memory data store — no real database or persistence.

## Commands

- `npm run dev` — start the API on http://localhost:3000 with auto-reload
- `npm test` — run all tests (Node's built-in test runner + supertest)
- `npm test -- --test-name-pattern="<name>"` — run a single test by name
- `npm run lint` — run ESLint

## Conventions

- Routes live one file per resource under `routes/` and are mounted in `server.js` under their resource path.
- Route handlers never touch data directly — they call into `db/store.js`, which owns the in-memory data and id assignment.

## Architecture

- `server.js` is the sole entry point; it only calls `app.listen` when run directly, so tests import the app and drive it with `supertest` without opening a real port.
- `db/store.js` stands in for a real database: plain in-memory arrays, reset on every restart.
