# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Overview

A small Express REST API starter (Node.js, CommonJS). It exposes `/users` and `/health` endpoints backed by an in-memory store. This is the base project for the Claude Code course and is extended in later units.

## Commands

```bash
npm install        # install dependencies
npm run dev        # run with auto-reload (node --watch) on http://localhost:3000
npm start          # run without watch
npm test           # run the test suite (node --test, built-in runner + supertest)
npm run lint       # ESLint over the whole project
```

Run a single test file: `node --test tests/users.test.js`.

CI (`.github/workflows/ci.yml`) runs `npm install`, `npm run lint`, then `npm test` on Node 22 for every push and pull request — lint failures break the build, so run `npm run lint` before pushing.

## Architecture

- `server.js` is the entry point. It builds the Express app, mounts routers, and only calls `app.listen` when run directly (`require.main === module`), exporting the bare `app` otherwise — this lets tests import the app with supertest without binding a port.
- Routing is one file per resource under `routes/` (`users.js`, `health.js`), each exporting an `express.Router()`. `server.js` mounts them under a base path (`/users`, `/health`). Add a new resource by creating `routes/<name>.js` and mounting it in `server.js`.
- Data access goes through `db/store.js` — a tiny in-memory store (a module-level array) standing in for a database. It exports plain functions (`getAllUsers`, `getUserById`, `createUser`). Data resets on every restart. Routes must go through this module rather than touching data directly.
- Config comes from environment variables (e.g. `PORT`). `.env.example` documents them; real values live in a git-ignored `.env`.

## Conventions

- Use CommonJS (`require` / `module.exports`), not ESM — `.eslintrc.json` sets `sourceType: "script"`.
- Validate request input in the route and return the matching status code: `400` for missing/invalid fields, `404` for a resource that doesn't exist, `201` for a successful create.
- ESLint extends `eslint:recommended`; `no-unused-vars` is a warning that ignores `req`, `res`, `next`, and `_`-prefixed args, so unused middleware params are fine.
