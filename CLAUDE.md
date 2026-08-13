# CLAUDE.md

Starter Express API for the Claude Code course. The project is used to practice configuring Claude Code around a real codebase.

## Commands

npm run dev      # start the API on http://localhost:3000
npm test         # run tests
npm run lint     # check code style

## Conventions

- Use one router file per resource in `routes/`.
- Keep data access in `db/store.js`; do not access the data store directly from route files.

## Architecture

- `server.js` is the application entry point and mounts routers.
- `routes/` contains one router file per resource.
- `db/store.js` provides in-memory data access.