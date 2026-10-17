# Express API Project

A simple Express API designed to manage resource routing and application health checks.

## Build and Test Commands
- Install dependencies: `npm install`
- Start development server: `npm run dev`
- Run tests: `npm test`
- Run linting check: `npm run lint`

## Code Style Guidelines
- **Route Organization:** Always separate resource routes into individual files within the `routes/` directory.
- **Data Access:** Use the unified `db/store.js` helper for managing all in-memory data state instead of local route variables.

## Architecture
- `server.js` — The main entry point that initializes and starts the Express API server.
- `routes/` — Contains isolated route files per resource (e.g., `users.js`, `health.js`).
- `db/` — Contains `store.js` for lightweight data storage operations.
- `tests/` — Contains application tests (e.g., `users.test.js`).
