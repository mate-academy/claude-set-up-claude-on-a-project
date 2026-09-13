# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview
This is a simple Express.js API starter project for the Claude Code course. It provides basic CRUD operations for users and a health check endpoint.

## Commands
- `npm run dev` - Start the development server with auto-restart on http://localhost:3000
- `npm test` - Run the test suite using Node.js test runner
- `npm run lint` - Check code style with ESLint
- `npm start` - Start the production server

## Conventions
- Route files export Express routers mounted in `server.js`
- Data access goes through the store module (`db/store.js`)
- Tests use Supertest for HTTP assertions and Node.js assert for validations
- Environment variables are managed through `.env` (gitignored) with example in `.env.example`

## Architecture
- **Entry Point**: `server.js` - Sets up Express middleware and mounts route handlers
- **Routes**: Separated by resource in `routes/` directory (`users.js`, `health.js`)
- **Data Layer**: `db/store.js` - Simple in-memory data store (resets on server restart)
- **Testing**: `tests/` directory with Supertest for API testing and Node.js test runner