# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

A minimal Express REST API used as the base project for a Claude Code course. The app is intentionally simple so learners can focus on Claude Code setup rather than application code.

## Commands

```
npm install       # install dependencies
npm run dev       # start API with hot-reload on http://localhost:3000
npm test          # run all tests (Node built-in test runner)
npm run lint      # check code style with ESLint
```

To run a single test file: `node --test tests/users.test.js`

## Architecture

- `server.js` - entry point; mounts route files and exports `app` without starting a port (so tests can import it cleanly)
- `routes/` - one file per resource (`users.js`, `health.js`), each exporting an Express Router
- `db/store.js` - in-memory data layer; data resets on every server restart; no real database

## Conventions

- Use CommonJS (`require`/`module.exports`), not ES modules - `package.json` has no `"type": "module"`
- Route handlers access data only through `db/store.js` functions, never manipulating the arrays directly
- Config comes from `process.env`; copy `.env.example` to `.env` for local values - never commit `.env`
- ESLint extends `eslint:recommended`; `req`, `res`, `next`, and `_`-prefixed args are exempt from `no-unused-vars`
