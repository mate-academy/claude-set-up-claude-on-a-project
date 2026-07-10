# CLAUDE.md

This project is a small Express API for managing users and checking service health.

## Commands

- `npm run dev` starts the API locally.
- `npm test` runs the automated tests.
- `npm run lint` checks code style.

## Conventions

- Add each API resource in its own file inside `routes/`.
- Access application data through `db/store.js`; do not create separate in-memory stores inside route files.
- Add or update tests whenever behavior changes.
- Never commit secrets or `.env` files.

## Architecture

- `server.js` is the application entry point and registers the routes.
- `routes/` contains one route file per resource.
- `db/store.js` contains the in-memory data access logic.
- `tests/` contains the automated tests.