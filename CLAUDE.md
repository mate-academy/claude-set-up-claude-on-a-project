# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

Starter Express API (users + health endpoints, in-memory data) used as the base project for the Claude Code course.

## Commands

- `npm run dev` — start the API with `node --watch` on http://localhost:3000 (`PORT` env var overrides)
- `npm test` — run all tests with the built-in `node --test` runner
- `node --test tests/users.test.js` — run a single test file; add `--test-name-pattern="<name>"` for a single test
- `npm run lint` — ESLint (`eslint:recommended`)

## Architecture

- `server.js` is the entry point. It wires routers onto the Express `app` and only calls `listen` when run directly (`require.main === module`), then exports `app` so tests can use it via supertest without opening a port.
- One router file per resource in `routes/`, mounted at `/<resource>` in `server.js`.
- Routes never touch data directly; all data access goes through `db/store.js`, an in-memory store that resets on restart.

## Conventions

- CommonJS only (`require` / `module.exports`); ESLint is configured with `sourceType: "script"`, so don't use ES module `import`.
- Error responses are JSON shaped `{ error: "message" }` with the appropriate status code (400 validation, 404 not found).
- Tests use `node:test` + `node:assert` + `supertest` against the exported `app` — not Jest/Mocha.
- Config comes from environment variables; add new ones to `.env.example`. Never read or commit `.env`.
- The course README says the app code is not to be changed during setup tasks (only `CLAUDE.md`, `.claude/settings.json`, `NOTES.md`).
