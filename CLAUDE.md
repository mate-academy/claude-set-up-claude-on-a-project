# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

A minimal Express REST API used as the base project for a Claude Code course. Data is in-memory only — it resets on restart.

## Commands

```bash
npm run dev    # start API with live reload (http://localhost:3000)
npm test       # run all tests with Node's built-in test runner
npm run lint   # check code style with ESLint
```

To run a single test file: `node --test tests/users.test.js`

## Architecture

- `server.js` — entry point; mounts routers and exports `app` for tests (does not call `listen` when imported)
- `routes/` — one file per resource (`users.js`, `health.js`); each exports an Express router
- `db/store.js` — all data access goes through here; exposes named functions, no direct array mutations elsewhere

## Conventions

- CommonJS throughout (`require` / `module.exports`); do not use ES module syntax (`import`/`export`)
- Add new resources as a new file in `routes/` and mount it in `server.js` — one router per resource
- ESLint extends `eslint:recommended`; unused args are allowed only when prefixed with `_` (or named `req`, `res`, `next`)
- Environment variables come from `.env` (git-ignored); `.env.example` documents the expected keys — update it when adding new vars
