# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

A starter Express API for the Claude Code course — a simple REST service with user management and a health endpoint, running on Node.js with in-memory storage for local development.

## Commands

| Command | Purpose |
|---------|---------|
| `npm run dev` | Start the server in watch mode on `http://localhost:3000` |
| `npm test` | Run all tests using Node's built-in test runner |
| `npm run lint` | Run ESLint to check code style |




## Conventions

- **Use Express Router** for all route definitions; each resource gets its own file in `routes/` (see `routes/users.js` and `routes/health.js`).
- **Data access through `db/store.js`** — never access or mutate the data store directly from routes; always call the store's exported functions.
- **Match ESLint config** — unused function parameters starting with `_` are allowed; common Express params (`req`, `res`, `next`) are also exempt.

## Architecture

**Entry point:** `server.js` — sets up Express, registers routes, and conditionally starts the HTTP server (skips starting if imported by tests).

**Routes layer:** `routes/users.js` handles three endpoints:
- `GET /users` — list all users
- `GET /users/:id` — fetch a single user (404 if not found)
- `POST /users` — create a user (400 if name or email missing)

`routes/health.js` provides a basic liveness check.

**Data layer:** `db/store.js` — in-memory store with three functions:
- `getAllUsers()` — returns the user array
- `getUserById(id)` — returns a single user or undefined
- `createUser({ name, email })` — creates and stores a new user

No real database; data resets on server restart.

**Testing:** Uses Node's built-in `test` module and `supertest` for HTTP assertions. Tests import the `app` from `server.js` directly, which is why the server only starts when run as the main module.

## Environment

Copy `.env.example` to `.env` to configure `PORT` (defaults to 3000). The `.env` file is git-ignored; real secrets belong there, never in code.
