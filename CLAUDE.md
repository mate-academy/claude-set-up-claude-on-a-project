# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

A minimal Express API with in-memory storage, exposing `/health` and `/users`.

## Commands

- `npm run dev` — start the API with auto-restart on http://localhost:3000
- `npm test` — run the test suite
- `npm run lint` — lint the project

## Conventions

- Access data through `db/store.js`'s exported functions, not by touching in-memory arrays directly.
- Return JSON error bodies with a 4xx status (e.g. `{ error: "..." }`), not thrown exceptions, for invalid input.

## Architecture

`server.js` is the entry point: it mounts one router per resource from `routes/` (e.g. `users.js`, `health.js`). Routers call into `db/store.js` for all data access rather than managing state themselves.
