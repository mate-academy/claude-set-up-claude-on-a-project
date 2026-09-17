# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Description

Express.js REST API for user management, built as a starter project for the Claude Code course. Simple in-memory database with CRUD endpoints.

## Commands

- `npm run dev` — Start development server with hot reload on http://localhost:3000
- `npm test` — Run all tests
- `npm run lint` — Check code style
- `node --test tests/users.test.js` — Run specific test file

## Conventions

- Use Express router pattern: one route file per resource in `routes/`, exported as a router module
- API endpoints follow REST conventions: `GET /users` (list), `POST /users` (create), `GET /users/:id` (fetch)
- Data validation returns 400 for invalid input, 404 for not found
- Use `express.json()` middleware for parsing request bodies

## Architecture

- `server.js` — Main Express app setup, mounts routers, exports app for testing
- `routes/users.js` — User CRUD endpoints (GET /users, GET /users/:id, POST /users)
- `routes/health.js` — Health check endpoint (GET /health)
- `db/store.js` — In-memory data layer with `getAllUsers()`, `getUserById()`, `createUser()`
- `tests/users.test.js` — Integration tests using Node's built-in test runner and supertest
