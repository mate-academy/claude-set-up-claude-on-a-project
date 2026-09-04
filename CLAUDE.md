# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview
Simple Express.js API with user management endpoints and health check.

## Common Commands
- Start development server: `npm run dev` (runs on http://localhost:3000)
- Run tests: `npm test`
- Lint code: `npm run lint`
- Start production server: `npm start`

## Conventions
- Route files live in `routes/` directory, one file per resource (users.js, health.js)
- Data access layer is in `db/store.js` - all database operations go through this module
- Server entry point is `server.js` which sets up middleware and mounts routes
- Tests use Node.js test runner with Supertest for HTTP assertions, located in `tests/`

## Architecture
- Express app created in `server.js` with JSON middleware
- Routes mounted at `/users` and `/health` paths
- In-memory data store in `db/store.js` with CRUD operations for users
- Environment configuration via `.env` file (gitignored, see `.env.example`)
- API endpoints:
  - GET `/health` - returns { status: "ok" }
  - GET `/users` - returns array of all users
  - GET `/users/:id` - returns single user or 404
  - POST `/users` - creates user with required name and email fields