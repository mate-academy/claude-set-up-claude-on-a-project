# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Overview

Express API starter for the Claude Code course — provides a simple user management REST API with in-memory data storage.

## Commands

- `npm run dev` — Start the API in watch mode on `http://localhost:3000`
- `npm test` — Run all tests (Node's built-in test runner + supertest)
- `npm run lint` — Check code style with eslint

## Conventions

- **Route files over direct app routes** — Each resource gets its own file in `routes/`. Create new routes there and mount them in `server.js`, don't define them inline.
- **Error responses use appropriate HTTP status codes** — 404 for missing resources, 400 for bad requests, 201 for successful POST/create.
- **Allow unused parameters prefixed with underscore** — Express convention: `req`, `res`, and `next` are allowed even if unused in handler; use `_` prefix for intentionally unused params (e.g., `(req, res, _next) => {}`).

## Architecture

- **`server.js`** — Express app setup. Mounts routes; conditionally starts the server so tests can import `app` without binding a port.
- **`routes/`** — One file per resource. Each exports an Express router. Currently: `users.js` (list, get by id, create) and `health.js` (liveness check).
- **`db/store.js`** — In-memory data store. Stands in for a database; data resets on restart. Exports `getAllUsers`, `getUserById`, `createUser`.
- **`tests/`** — Tests import `app` directly and use supertest to make requests. New tests follow the same pattern: `test("description", async () => { ... })`.

## Environment

- `PORT` — Defaults to 3000; set via environment variable to override.
