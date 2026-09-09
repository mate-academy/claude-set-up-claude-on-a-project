# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

A lightweight Express.js REST API for managing users, built as a learning project for the Claude Code course.

## Commands

- `npm run dev` — start the API with auto-reload on port 3000
- `npm test` — run all tests (Node.js built-in test runner)
- `npm test -- tests/users.test.js` — run a specific test file
- `npm run lint` — check code style with ESLint

## Architecture

**Entry point:** `server.js` creates and exports the Express app. The server only starts if run directly (not imported), so tests can import `app` without binding to a port.

**Routing:** Each resource has its own file in `routes/`. Router instances are mounted on `app` by path prefix (`/users`, `/health`).

**Data:** `db/store.js` is the only place that touches the user data — all routes import and call its methods (`getAllUsers`, `getUserById`, `createUser`). Data is in-memory and resets on server restart.

**Testing:** Uses Node.js built-in `test` and `assert` modules. `supertest` makes HTTP requests to the Express app in tests.

## Conventions

- Use store methods for data access, not direct data access in routes
- Use 400 status for missing required fields in POST requests, not 500 or silence
- Use 404 with `{ error: "..." }` for missing resources, not other status codes
