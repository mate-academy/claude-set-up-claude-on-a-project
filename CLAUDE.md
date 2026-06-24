# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this project is

A small Express REST API used as a course project for setting up Claude Code. It exposes two resources: `/users` (CRUD) and `/health` (liveness check). Data lives in memory and resets on restart — there is no database.

## Commands

```bash
npm run dev   # start the API on http://localhost:3000 with file-watch reload
npm test      # run all tests (Node built-in test runner)
npm run lint  # check code style with ESLint
```

To run a single test file:
```bash
node --test tests/users.test.js
```

## Architecture

- `server.js` — creates the Express app, mounts routes, and exports `app` for tests. Only calls `app.listen` when run directly, so tests can import without opening a port.
- `routes/` — one file per resource (`users.js`, `health.js`), each exporting an Express Router.
- `db/store.js` — all data access goes through here. Routes never touch the `users` array directly.

## Conventions

- All data access must go through `db/store.js` — routes call store functions, not the array.
- Route files export a single `express.Router()`; mount them in `server.js`.
- Use CommonJS (`require`/`module.exports`); the ESLint config is set to `sourceType: "script"`.
- ESLint extends `eslint:recommended`. Unused args are allowed only when prefixed with `_` or named `req`, `res`, or `next`.
- Copy `.env.example` to `.env` for local config; never commit `.env`.
