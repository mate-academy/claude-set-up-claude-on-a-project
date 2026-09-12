# CLAUDE.md

## Overview

A minimal Express API starter with routes for user and health-check endpoints.

## Commands

```bash
npm run dev      # Start server with auto-reload (--watch)
npm test         # Run tests in tests/ with Node's test module
npm run lint     # Check code style with eslint
npm start        # Start server once (for production)

Run a single test file: npm test -- tests/users.test.js

Architecture

- server.js — Express app setup; mounts routers and exports app so tests can import it without starting a port
- routes/*.js — One router file per resource (users, health); each exports an Express router
- db/store.js — Data access layer with simple functions (getAllUsers, getUserById, createUser); currently in-memory
- tests/*.test.js — Tests use Node's built-in test module with supertest for HTTP assertions; import app directly from server.js

Conventions

- Use thin route handlers with logic delegated to data access functions, not fat handlers with embedded business logic
- Use resource-based file organization, not HTTP-method-based organization
- Use assertions on HTTP status codes and response structure, not implementation details
- Use request validation in route handlers with explicit 400 responses, not silent failures or downstream validation
