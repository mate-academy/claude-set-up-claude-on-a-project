# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

A small Express REST API.

## Commands

```bash
npm run dev    # start API with file-watching on http://localhost:3000
npm test       # run all tests (Node built-in test runner + supertest)
npm run lint   # ESLint check
```
Before considering any change complete, run npm test and npm run lint and make sure both pass.

To run a single test file: `node --test tests/users.test.js`

## Architecture

- `server.js` — entry point; mounts routes and exports `app` without starting the server when imported (so tests don't open a real port)
- `routes/` — one file per resource (`users.js`, `health.js`); each exports an Express Router
- `db/store.js` — in-memory data layer; data resets on restart; all route files go through this module for data access

## Conventions

- Use CommonJS (`require`/`module.exports`), not ESM
- Route files only handle HTTP concerns; data logic lives in `db/store.js`
- `PORT` is read from the environment (see `.env.example`); copy to `.env` for local overrides
- ESLint is `eslint:recommended`; unused function args are allowed if prefixed with `_` or named `req`, `res`, or `next`
