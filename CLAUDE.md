# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

A starter Express REST API used as a practice project for the Claude Code course.

## Commands

```
npm install       # install dependencies
npm run dev       # start API with live reload on http://localhost:3000
npm test          # run all tests (Node built-in test runner)
npm run lint      # check code style with ESLint
```

To run a single test file: `node --test tests/users.test.js`

## Conventions

- Use CommonJS (`require`/`module.exports`), not ESM (`import`/`export`)
- Route handlers receive `(req, res)` — these names are excluded from the `no-unused-vars` lint rule; don't rename them
- All data access goes through `db/store.js` — routes never manipulate the `users` array directly
- Add one route file per resource under `routes/`; mount it in `server.js`

## Architecture

`server.js` is the entry point: it mounts route modules and exports `app` without binding a port, so tests can import it directly via supertest. Routes delegate all reads/writes to `db/store.js`, which is a plain in-memory store (data resets on restart). Environment config comes from `.env` (copy `.env.example`; never commit `.env`).
