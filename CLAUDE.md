# Project Instructions

This project is a small Express API with routes for users and health checks, using an in-memory data store.

## Commands

* `npm run dev` — start the API locally.
* `npm test` — run the test suite.
* `npm run lint` — check code style.

## Conventions

* Keep route handlers focused on HTTP concerns and use `db/store.js` for data access.
* Add new resources as separate route files in `routes/`.
* Reuse existing project patterns instead of duplicating functionality.
* Make the smallest change necessary for the task.

## Architecture

* `server.js` is the application entry point.
* `routes/` contains one route file per resource.
* `db/store.js` handles in-memory data access.
* `tests/` contains the automated tests for the API.
