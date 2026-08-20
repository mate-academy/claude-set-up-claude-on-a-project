# CLAUDE.md

A minimal Express API starter used for the Claude Code course.

## Commands

- `npm run dev` — start the API with auto-restart on file changes
- `npm test` — run all tests (Node's built-in test runner)
- `npm run lint` — run ESLint over the project

## Conventions

- Use one route file per resource in `routes/`.
- Keep data access logic in `db/store.js`; do not manipulate data directly inside route handlers.
- Follow the existing ESLint configuration.
- Keep real secrets in `.env`; use `.env.example` only to document required variables.

## Architecture

- `server.js` is the application entry point and mounts the API routes.
- `routes/` contains one router per resource, such as `users.js` and `health.js`.
- `db/store.js` is the in-memory data access layer used by routes.
- `tests/` contains integration tests that exercise the Express app through Supertest.
