# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project status

A small Express REST API for managing users (list, fetch, create).

## Commands

```bash
npm install                       # install dependencies
npm run dev                       # start the API on http://localhost:3000, restarts on file save
npm test                          # run all tests (Node's built-in runner, finds tests/*.test.js)
node --test tests/users.test.js   # run a single test file
npm run lint                      # ESLint over the whole repo; no output means clean
curl -s localhost:3000/health     # check a running server responds: {"status":"ok"}
curl -s localhost:3000/status     # process uptime in seconds: {"uptime":12.345}
```

Set the port with `PORT` (see `.env.example`); it defaults to 3000.

## Conventions

Code
- Use CommonJS (`require` / `module.exports`), not ES modules — ESLint is set to `sourceType: "script"`.
- Use double quotes and semicolons, matching the existing files.
- Read and write data only through the functions in `db/store.js`; never touch the `users` array from a route.
- Send errors as JSON `{ "error": "<message>" }` with the right status: 400 for invalid input, 404 for not found, 201 for a successful create.
- Write tests with `node:test`, `node:assert` and `supertest`, not Jest. Import `app` from `server.js`; never start a real server in a test.

Git
- Never commit to `main` directly: work on a branch (e.g. `fix/...`, `feature/...`) and merge through a pull request.
- Run `npm test` and `npm run lint` before committing.

## Architecture

- `server.js` is the entry point: it creates the Express app and mounts one router per resource. It exports `app` and only calls `listen()` when run directly, so tests can use it without opening a port.
- `routes/` holds one file per resource, each exporting an `express.Router()`.
- `db/store.js` is an in-memory data store; all data access goes through its functions. Data resets on every restart.
