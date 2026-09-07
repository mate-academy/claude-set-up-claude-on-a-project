# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Purpose

An Express API. Handles HTTP routes for the app's resources and reads/writes data through a single data-access module.

## Commands

```bash
npm run dev    # start the dev server
npm test       # run the test suite
npm run lint   # run the linter
```

## Conventions

- Use `db/store.js` for data access, not direct database/file calls from route handlers.
- Use async/await for asynchronous code, not `.then()`/`.catch()` chains.
- Use one route file per resource under `routes/`, not one shared router file for multiple resources.

## Architecture

- `server.js` — application entry point; creates the Express app, wires up middleware, mounts the routers from `routes/`.
- `routes/` — one file per resource (e.g. `routes/users.js`, `routes/orders.js`); each defines HTTP endpoints for that resource and calls into `db/store.js` for data.
- `db/store.js` — single data-access layer; all reads/writes to the data store go through here.
