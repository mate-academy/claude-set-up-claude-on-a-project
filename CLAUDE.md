# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

A minimal Express.js REST API for user management, built as a starter project for the Claude Code course. It includes a health check and CRUD operations for users with an in-memory data store.

## Commands

- `npm run dev` — starts the API in watch mode (auto-restarts on file changes)
- `npm test` — runs tests using Node's built-in test runner
- `npm run lint` — checks code style with ESLint

## Architecture

The API follows a modular pattern:

- **server.js** — Express app setup; exports the app for testing and starts the server when run directly
- **routes/** — one file per resource (e.g., `users.js`, `health.js`); mounted in server.js with `app.use()`
- **db/store.js** — data access layer; exports simple read/write functions (getAllUsers, getUserById, createUser)
- **tests/** — integration tests using Node's test runner and supertest for HTTP assertions

## Conventions

- **Route files** — one resource per file, named after the resource plural (users.js, health.js)
- **Unused parameters** — name them with a leading underscore or use the patterns req, res, next (configured in .eslintrc.json)
- **Data layer** — all data access flows through db/store.js; don't query data directly in route handlers
- **Testing** — use supertest to test HTTP responses and app state; tests import app directly from server.js (no port binding during test)

## Notes

- The in-memory data store (`db/store.js`) does not persist data; it resets on each server restart. Use it as-is for development and testing.
- PORT defaults to 3000, but can be set via the PORT environment variable.
- CI runs lint and tests on every push and pull request (.github/workflows/ci.yml).
