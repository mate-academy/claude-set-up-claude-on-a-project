# CLAUDE.md

Starter Express API for practicing Claude Code workflows and project conventions.

## Commands

- `npm run dev` — start the development server
- `npm test` — run all tests
- `npm run lint` — run ESLint

## Conventions

- Use CommonJS (`require`/`module.exports`), not ESM.
- Keep route handlers thin: validate input, delegate data access to `db/store.js`, return JSON responses with appropriate HTTP status codes.
- Access data only through `db/store.js`; do not manipulate the data store directly.

## Architecture

- `server.js` is the application entry point and mounts all routes.
- `routes/` contains one route file per resource.
- `db/store.js` provides the application's data access layer.