# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

A minimal Express REST API used as a learning project for setting up Claude Code.

## Commands

```bash
npm install       # install dependencies
npm run dev       # start server with auto-reload (http://localhost:3000)
npm test          # run all tests
npm run lint      # check code style
```

To run a single test by name:
```bash
node --test --test-name-pattern="GET /health"
```

## Architecture

- `server.js` — entry point; mounts routes and exports `app` without binding a port (so tests can import it directly)
- `routes/` — one file per resource (`users.js`, `health.js`); each exports an Express Router
- `db/store.js` — in-memory data store (no persistence; resets on restart); all data access goes through its exported functions

## Conventions

- Add new resources as a route file in `routes/` and mount it in `server.js`
- All data reads and writes must go through `db/store.js`, not inline array manipulation in routes
- Copy `.env.example` to `.env` for local config; never commit `.env`
