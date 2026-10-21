## Project

This project is an Express API with user and health endpoints.

## Commands

- npm run dev
- npm test
- npm run lint

## Conventions

 - Use Express Router in routes/ files, not global app routes
 - Use async/await for all route handlers

## Architecture

- server.js as the entry point
- one route file per resource in routes/
- data access through db/store.js

## Environment

The environment is Windows with PowerShell 5.1.