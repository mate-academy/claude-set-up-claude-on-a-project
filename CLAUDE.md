# CLAUDE.md

A lightweight Node.js and Express REST API for managing user resources.

## Commands
- `npm install` — Install project dependencies
- `npm run dev` — Start the development server
- `npm test` — Run the automated test suite in `tests/`
- `npm run lint` — Check code style against `.eslintrc.json`

## Architecture
- `server.js` — Main application entry point and Express server configuration
- `routes/` — API route handlers, organized with one file per resource
- `db/store.js` — Central data access layer handling all database and store operations
- `tests/` — Automated integration and unit tests (`users.test.js`)

## Conventions
- Use `npm run dev` instead of `npm start` for local development
- Use `db/store.js` for all data access instead of querying or mutating state directly inside route handlers
- Never hardcode secrets or environment values; always load them from `.env` based on `.env.example`
