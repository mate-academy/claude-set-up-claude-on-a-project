# CLAUDE.md

This file provides guidance to Claude Code when working with code in this repository.

## Project

Starter Express REST API for the Claude Code course. It uses in-memory data store (no database) — data resets on every restart.

## Commands

```bash
npm install          # install dependencies
npm run dev          # start with --watch on http://localhost:3000
npm test             # run all tests (Node.js built-in test runner)
npm run lint         # ESLint check
```

Run a single test file: `node --test tests/users.test.js`

## Architecture

- **server.js** — Express app entry point. Mounts route modules and exports `app` (does not listen when imported, so tests can use supertest without opening a port).
- **routes/** — one file per resource (`users.js`, `health.js`), each exports an Express Router.
- **db/store.js** — in-memory data layer. All data access goes through this module.
- **tests/** — uses Node.js `node:test` + `node:assert` with supertest for HTTP assertions.

## Conventions

- CommonJS (`require`/`module.exports`), not ES modules.
- Strictly adhere to formatting and linting rules defined in
  `.eslintrc.json`. Notable: `no-unused-vars` is a warning, not an error,
  with exceptions for `_`, `req`, `res`, `next`.
- Tests import `app` from `server.js` and use supertest — no real server starts during tests.
- Environment config via `.env` (git-ignored); see `.env.example` for available variables. 
- Never read, print, or include the contents of `.env` in
     responses, commits, or logs. Reference `.env.example` for variable names
     only. 
- Commit messages must summarize the actual change (not generic), using a short imperative subject line (≤50 chars) and, if multiple files changed for different reasons, a bullet-point body explaining each.

## CI

GitHub Actions runs `npm install`, `npm run lint`, and `npm test` on Node 22 for every push and PR.