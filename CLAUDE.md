# Project Guide

## Description

A small Express.js API with user and health endpoints backed by an in-memory data store.

## Commands

- `npm run dev` — start the API in development mode.
- `npm test` — run the automated tests.
- `npm run lint` — check the code with ESLint.

## Conventions

- Use CommonJS (`require` / `module.exports`) to match the existing project.
- Keep resource-specific HTTP routes in `routes/` rather than defining them directly in `server.js`.
- Use the existing data-access helper in `db/store.js` for application data rather than adding a separate data store.
- Keep automated tests in `tests/` and run them with `npm test`.

## Architecture

- `server.js` is the application entry point and mounts the API routers.
- `routes/` contains one route file per resource, such as users and health.
- `db/store.js` provides the in-memory data-access helper.
- `tests/` contains automated API tests.
