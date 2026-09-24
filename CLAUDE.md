# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this project is

A small Express.js REST API used as a learning project for Claude Code. It exposes `/users` (CRUD) and `/health` endpoints backed by an in-memory store.

## Commands

```bash
npm install
npm run dev
npm test
npm run lint
```

To run a single test by name:
```bash
node --test --test-name-pattern "GET /health"
```

## Architecture

- `server.js` — creates the Express app, mounts routes, exports `app` (no port binding when imported, so tests work cleanly)
- `routes/` — one file per resource; each exports an `express.Router`
- `db/store.js` — all data access goes through this module; plain functions, no ORM; data resets on restart

## Conventions

- CommonJS (`require`/`module.exports`) throughout — do not use ESM `import`/`export`
- Route files only handle HTTP concerns; data logic belongs in `db/store.js`
- Tests use Node's built-in `node:test` + `assert` + `supertest`; no Jest
- `PORT` is the only env var; set it in `.env` (copy `.env.example`)
