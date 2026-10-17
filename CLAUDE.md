# CLAUDE.md

A small Express 4 REST API for users and health checks, used as a starter project for the Claude Code course.

## Commands

```bash
npm run dev    # Start development server on port 3000 (PORT overrides)
npm test       # Run tests using Node's built-in test runner
npm run lint   # Run ESLint
```

## Conventions

- Use CommonJS (`require` / `module.exports`), not ES modules.
- Use double quotes and semicolons.
- Return JSON `{ error: "<message>" }` for errors (400 for validation, 404 for missing resources).
- Return HTTP 201 with the created object after successful creation.
- Convert route IDs with `Number(req.params.id)` before store lookups.
- Add a `// METHOD /path — description` comment before each route handler.
- Write tests using `node:test`, `node:assert`, and `supertest` in `tests/*.test.js`.
- Keep lint and tests passing.

## Architecture

- `server.js` creates and exports the Express app, mounts routers, and calls `listen()` only when run directly.
- `routes/` contains one Express router per resource, mounted in `server.js`.
- `db/store.js` owns in-memory data and exposes functions for data access. Routes must use these functions, not maintain separate data arrays.
