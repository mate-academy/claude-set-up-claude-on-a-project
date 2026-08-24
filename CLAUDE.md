# CLAUDE.md

## Project
Starter Express API with resource-based routing and in-memory persistence.

## Commands
- `npm run dev` — Start API at localhost:3000 (auto-reload)
- `npm test` — Run Node test runner
- `npm run lint` — ESLint check

## Conventions
- Use `routes/<resource>.js` for new endpoints (one route file per resource).
- Access data exclusively via `db/store.js` (no direct data manipulation in routes).
- Remove unused variables instead of ignoring warnings (prefix unused express args with `_` if required).

## Architecture
- `server.js` — Entry point. Mounts routes/middleware, exports `app`.
- `routes/` — Express routers per resource.
- `db/store.js` — In-memory store handling all read/write data operations.
- `tests/` — Integration tests importing `app` via `supertest`.