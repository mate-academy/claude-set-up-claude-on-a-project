# CLAUDE.md

## Overview

A minimal Express API starter with routes for user and health-check endpoints. 

## Commands

```bash
npm run dev      # Start server with auto-reload (--watch)
npm test         # Run tests in tests/ with Node's test module
npm run lint     # Check code style with eslint
npm start        # Start server once (for production)
```

Run a single test file: `npm test -- tests/users.test.js`

## Architecture

- `server.js` — Express app setup; mounts routers and exports `app` so tests can import it without starting a port
- `routes/*.js` — One router file per resource (users, health); each exports an Express router
- `db/store.js` — Data access layer with simple functions (getAllUsers, getUserById, createUser); currently in-memory
- `tests/*.test.js` — Tests use Node's built-in `test` module with supertest for HTTP assertions; import `app` directly from server.js

## Conventions

- Keep route handlers simple; complex logic goes in data access functions
- Route files are organized by resource, not by HTTP method
- Tests assert on status codes and response structure, not implementation details
- Data validation happens in route handlers (check required fields, return 400 if missing)
