# CLAUDE.md

## Project
A small Express API used as a real project for the Claude Code course.

## Commands
- npm run dev — start the API
- npm test — run tests
- npm run lint — check code style

## Conventions
- Use CommonJS (require / module.exports), not ESM.
- Use double quotes and semicolons.

## Architecture
- server.js is the application entry point.
- routes/ contains one route file per resource.
- db/store.js contains the in-memory data store.
