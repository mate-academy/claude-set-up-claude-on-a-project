# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

A small Express REST API used as the base project for a Claude Code course.

## Commands

```bash
npm run dev    # start API with live reload on http://localhost:3000
npm test       # run all tests (Node built-in test runner + supertest)
npm run lint   # ESLint check
```

To run a single test file: `node --test tests/users.test.js`

## Architecture

- `server.js` — entry point; registers routes and exports `app` without starting the server, so tests can import it without binding a port.
- `routes/` — one file per resource (`users.js`, `health.js`); each file is an Express Router mounted in `server.js`.
- `db/store.js` — in-memory data layer; all data access goes through its exported functions (`getAllUsers`, `getUserById`, `createUser`). Data resets on every server restart.

## Conventions

- CommonJS (`require`/`module.exports`) throughout — no ESM.
- `eslint:recommended` with ES2022. Unused args are tolerated only if prefixed with `_` or named `req`, `res`, or `next`.
- Route handlers validate input and return JSON errors (`{ error: "..." }`) with the appropriate HTTP status before calling store functions.
- New resources follow the pattern: one route file in `routes/`, mounted in `server.js`, with data access only through `db/store.js`.
