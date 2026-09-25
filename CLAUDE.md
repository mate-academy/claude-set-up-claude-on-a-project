# CLAUDE.md

A small Express REST API (users + health check) that serves as the starter project for the Claude Code course.

## Commands

- `npm run dev` — start the API
- `npm test` — Node test runner
- `npm run lint` — ESLint

## Conventions

- Use CommonJS (`require` / `module.exports`), not ES modules — ESLint is configured with `sourceType: "script"`.
- Access data only through functions exported from `db/store.js`;
- Return errors as JSON `{ "error": "<message>" }` with the matching status code (400 for invalid input, 404 for missing resources); return 201 on create.
- Don't modify the app code unless asked

## Architecture

- `server.js` builds the Express app,
- `routes/` holds one file per resource.
- `db/store.js` is an in-memory store standing in for a database.