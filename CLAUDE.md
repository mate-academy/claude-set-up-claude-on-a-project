# CLAUDE.md

## Description

A small Express REST API exposing user and health endpoints.

## Commands

npm run dev   # Start the development server with automatic restarts
npm test      # Run the automated test suite
npm run lint  # Check the codebase for ESLint errors

## Conventions

* Use CommonJS (`require` and `module.exports`), not ES modules.
* Validate request input in route handlers before calling the store; return errors as `res.status(4xx).json({ error: "..." })`.
* Convert route parameters with `Number(...)` before comparing them with numeric IDs.
* Use `process.env` for configuration, document new variables in `.env.example`, and never commit `.env`.

## Architecture

`server.js` creates and exports the Express app, mounts routers, and only starts the server when run directly.

`routes/` contains one `express.Router` file per resource. Mount new routers in `server.js`.

`db/store.js` is the only data-access layer. Routes must use its exported functions rather than accessing state directly.

`tests/` contains HTTP tests that import the app and use Supertest.