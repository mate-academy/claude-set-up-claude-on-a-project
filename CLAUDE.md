# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

A starter Express.js API for the Claude Code course. Serves as a small real codebase for practicing Claude Code setup (CLAUDE.md, permissions) rather than a production app.

## Commands

```
npm install       # install dependencies
npm run dev       # start the API with --watch on http://localhost:3000
npm start         # start the API without watch mode
npm test          # run all tests (Node's built-in test runner)
npm run lint      # run ESLint
```

Run a single test file directly: `node --test tests/users.test.js`

## Architecture

- `server.js` lets `tests/*.test.js` `require("../server")` and exercise the app with `supertest` without opening a real port.
- Tests use Node's built-in `node:test` + `node:assert`, with `supertest` for HTTP assertions against the exported `app`.

## Conventions

- CommonJS modules (`require`/`module.exports`), not ESM.
- Route handlers validate input and return JSON error bodies (e.g. `{ error: "..." }`) with appropriate status codes (400, 404) rather than throwing.
