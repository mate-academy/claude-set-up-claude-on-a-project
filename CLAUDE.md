# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

A minimal Express REST API used as a course starter project for learning Claude Code.

## Commands

```
npm install        # install dependencies
npm run dev        # start API with live reload on http://localhost:3000
npm test           # run all tests (Node built-in test runner)
npm run lint       # check code style with ESLint
```

There is no flag to run a single test file — `node --test tests/users.test.js` works directly.

## Architecture

- `server.js` — creates the Express app, mounts routes, exports `app` for tests (does not bind a port when imported)
- `routes/` — one file per resource; each file creates an `express.Router()` and exports it
- `db/store.js` — all data access goes through the functions exported here; the store is in-memory and resets on restart

## Conventions

- CommonJS (`require`/`module.exports`) throughout — do not use ES module syntax
- Route files must only talk to `db/store.js`, never hold data themselves
- Tests import `app` from `server.js` directly and use `supertest`; no server port is opened during tests
