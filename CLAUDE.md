# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

Starter Express API (users + health endpoints) used as a base for Claude Code course projects. The README's setup-task instructions are course scaffolding, not app requirements.

## Commands

```
npm run dev     # start the API on http://localhost:3000
npm test        # run tests
npm run lint    # check code style
node --test tests/users.test.js   # run a single test file
```

## Conventions

- Tests use the built-in `node:test` with `supertest`; don't add Jest or Mocha.
- Never read or commit `.env`; add new config keys to `.env.example`.

## Architecture

- `server.js` creates the app, mounts the routers, and exports `app`. Keep the `require.main === module` guard around `listen` so tests can import `app` without opening a port.
- `routes/` has one router file per resource (`users.js`, `health.js`), mounted in `server.js`.
- `db/store.js` is the in-memory data store; routes go through it and never hold data themselves. Data resets on restart. Route handlers pass `Number(id)` because the store compares IDs with `===`.
