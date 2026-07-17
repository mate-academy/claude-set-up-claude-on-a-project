# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

Express API for the Claude Code course. Provides a `/users` resource (list, fetch, create) and `/health` health check endpoint. Data is stored in-memory and resets on restart.

## Commands

- `npm run dev` — start server on port 3000 with file watching (`--watch`)
- `npm start` — start server in production mode (no file watching)
- `npm test` — run all tests via Node's built-in test runner
- `node --test tests/users.test.js` — run a single test file
- `npm run lint` — lint code with ESLint

## Architecture

**server.js** — Entry point. Creates Express app, mounts routes at `/users` and `/health`, configures JSON body parsing. Exports app separately from listening so tests can import without opening a real port.

**routes/** — One Express router per resource. Each route file exports a router with endpoint handlers. Routes validate input, call store functions, and return errors with appropriate status codes.

**db/store.js** — In-memory data store with three functions: `getAllUsers()`, `getUserById(id)`, `createUser({ name, email })`. Maintains a `nextId` counter for new records.

**tests/** — Uses Node's built-in `test` and `assert` modules plus Supertest for HTTP testing. Imports app directly (not server.js) to avoid opening a port during tests.

## Conventions

- Route handlers validate required fields before calling store functions, returning 400 with an error message if validation fails.
- Use early returns for error responses: `return res.status(code).json(...)`.
- ESLint rule: unused route parameters (`req`, `res`, `next`) are allowed and need not be prefixed with `_`.
- Store IDs are numbers; coerce string URL params with `Number()` before passing to store.

