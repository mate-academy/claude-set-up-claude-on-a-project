# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

A minimal Express REST API with in-memory data, used as a starter project for the Claude Code course.

## Commands

- `npm run dev` — start the API on http://localhost:3000 (auto-restarts on changes)
- `npm test` — run the test suite
- `npm run lint` — check code style

## Conventions

- On invalid input or a missing resource, return early with `res.status(...).json(...)`; don't nest the success path in an `else`.
- Name unused Express handler params `req`, `res`, `next` as-is, not with an `_` prefix — ESLint is configured to allow them.

## Architecture

- `server.js` is the entry point: builds the Express app and mounts one router per resource.
- Each resource has its own route file in `routes/` (e.g. `users.js`, `health.js`).
- All data access goes through `db/store.js`, an in-memory store — routes never manipulate data directly.
