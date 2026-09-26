# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

A small Express REST API (`/users`, `/health`) backed by an in-memory store, used as the practice codebase for the Claude Code course.

## Commands

- `npm install` — run first; `node_modules/` is not checked in
- `npm run dev` — start with auto-reload on http://localhost:3000
- `npm test` — run the tests
- `npm run lint` — ESLint

## Conventions

- Use `require` / `module.exports`, not `import` / `export`.
- Use `npm test` and `npm run lint`, not direct `node --test` or `npx eslint` calls.
- Use the functions exported from `db/store.js` for all data access, not the `users` array directly.
- Use double quotes, semicolons and 2-space indent to match the existing files; ESLint enforces no stylistic rules here.
- Use in-route validation that returns the status directly: `400` for invalid input, `404` for a missing record, `201` on create.

## Architecture

- `server.js` — entry point. Creates the app, registers `express.json()`, and mounts each router under its path.
- `routes/` — one file per resource, each exporting an `express.Router()`.
- `db/store.js` — in-memory array plus accessor functions. Data resets on every restart.
