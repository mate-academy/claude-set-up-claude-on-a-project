# CLAUDE.md

## Project

Starter Express REST API for the Claude Code course.

## Commands

- `npm run dev` — start the API with file watching
- `npm test` — run all tests
- `npm run lint` — run ESLint
- `node --test tests/users.test.js` — run a single test file

## Conventions

- Validate input in route handlers and return JSON errors with appropriate HTTP status codes; do not add shared error-handling middleware.
- Use one router file per resource in `routes/`; do not define resource routes directly in `server.js`.
- Use `db/store.js` for application data; do not store data directly in route modules.
- Prefix intentionally unused arguments with `_` to satisfy ESLint.

## Architecture

- `server.js` creates the Express app and mounts routers.
- `routes/` contains one router per resource, such as `users.js` and `health.js`.
- `db/store.js` provides the in-memory data layer used by routes.
- `tests/` contains Node.js tests for the API.