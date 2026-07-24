# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project overview

A minimal Express API that provides `/health` and `/users` endpoints using an in-memory data store.

## Commands

```bash
npm run dev      # Start the development server with watch mode
npm test         # Run the test suite
npm run lint     # Run ESLint
```

## Conventions

- Use CommonJS (`require`/`module.exports`); do not use ES Modules (`import`/`export`).
- Create one route file per resource inside `routes/` and mount it from `server.js`.
- Route handlers must access data only through `db/store.js`; do not manipulate the data store directly.
- Use `async/await` for asynchronous code instead of mixing callbacks or `.then()` chains.

## Architecture

- `server.js` is the application entry point. It creates the Express app, registers middleware, and mounts all routes.
- Each API resource has its own route file inside `routes/`.
- Data access is centralized in `db/store.js`, which provides an in-memory store used by all route handlers.
