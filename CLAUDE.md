# CLAUDE.md

Minimal Express user-CRUD service for practicing Claude Code workflows (requires Node 22+).

## Commands

- `npm run dev`
- `npm test`
- `npm run lint`

## Conventions

- Use plain JavaScript (`const`/`require`, double quotes, semicolons) — no TypeScript or ES modules.
- Use environment variables (e.g. `PORT`) for config via `.env.example` — never commit real secrets or `.env`.

## Architecture

`server.js` is the entry point that builds the Express app and mounts routes.

- `routes/` — one route file per resource (`/users`, `/health`) with input validation
- `db/store.js` — in-memory data store for state and CRUD operations