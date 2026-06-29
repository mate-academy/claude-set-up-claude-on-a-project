# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

A minimal Express REST API used as the foundation for a Claude Code course project.

## Commands

```bash
npm run dev   # start the API with file-watching on http://localhost:3000
npm test      # run all tests (Node built-in test runner + supertest)
npm run lint  # ESLint with eslint:recommended
```

To run a single test file: `node --test tests/users.test.js`

## Architecture

- `server.js` — entry point; mounts routes and exports `app` without binding a port (so tests can import it cleanly)
- `routes/` — one file per resource (`users.js`, `health.js`); each exports an Express Router
- `db/store.js` — in-memory data layer (resets on restart); all data access goes through its exported functions, not direct array mutation

## Conventions

- Use CommonJS (`require`/`module.exports`), not ES modules — the ESLint config enforces `sourceType: "script"`
- Route files must not import other route files; shared data access goes through `db/store.js`
- `no-unused-vars` is a warning, not an error; params named `_`, `req`, `res`, or `next` are exempt
- Copy `.env.example` to `.env` for local config; never commit `.env`