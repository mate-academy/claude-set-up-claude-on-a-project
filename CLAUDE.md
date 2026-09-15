# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Overview

A small Express API for managing users, with an in-memory data store and a health check endpoint.

## Commands

- `npm run dev` — start the API with auto-reload on `http://localhost:3000`
- `npm test` — run the test suite (`node:test` + `supertest`)
- `npm run lint` — check code style with ESLint

## Conventions

- CommonJS only: use `require`/`module.exports`, not ES module `import`/`export`.
- Error responses are JSON shaped as `{ "error": "message" }`, with an appropriate HTTP status code (see `routes/users.js`).

## Architecture

- `server.js` is the entry point; it wires up middleware and mounts route modules.
- `routes/` holds one file per resource (`users.js`, `health.js`); route modules only handle HTTP concerns.
- `db/store.js` is the sole data-access layer — an in-memory store that resets on restart. Routes go through it rather than holding their own state.
- `tests/` mirrors `routes/`, one test file per resource, exercising the app via `supertest`.
