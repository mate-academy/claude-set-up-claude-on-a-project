# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

A minimal Express REST API with `/users` and `/health` endpoints backed by an in-memory store.

## Commands

```bash
npm run dev   # start server on http://localhost:3000
npm test      # run all tests
npm run lint  # ESLint check
```

## Architecture

- `server.js` — entry point; exports `app` without binding a port so tests can import it directly
- `routes/` — one file per resource, each exporting an Express router
- `db/store.js` — all data access goes here, not inline in routes

## Conventions

- Use CommonJS (`require`/`module.exports`), not ES modules
- Return JSON error objects (`{ error: "..." }`) with appropriate status codes, not plain strings
