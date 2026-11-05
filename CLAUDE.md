# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

A small Express REST API (users + health check) with an in-memory data store. It's the starter project for a Claude Code course. Leave the app code alone unless the task asks you to change it.

## Commands

- `npm run dev` starts the API on http://localhost:3000 with `node --watch`. `npm start` runs it without watch. The port comes from `PORT`.
- `npm test` runs every test with the built-in `node --test` runner.
- `node --test --test-name-pattern="404" tests/users.test.js` runs a single test, matched by name.
- `npm run lint` runs ESLint 8 with the legacy `.eslintrc.json` config. Don't migrate it to flat config.
  - If lint crashes with `Cannot find package 'globals'` from an `eslint.config.mjs` outside this repo, ESLint picked up a flat config from a parent directory. Run `ESLINT_USE_FLAT_CONFIG=false npm run lint` instead. Don't add a flat config here to work around it.

CI (`.github/workflows/ci.yml`) runs `npm install`, `npm run lint`, and `npm test` on Node 22.

## Endpoints

- `GET /health` returns `{ status: "ok" }`.
- `GET /users` returns all users. `GET /users/:id` returns one user, or a 404.
- `POST /users` needs `name` and `email` and returns a 400 if either is missing. On success it returns the new user with a 201.

## Conventions

- Use CommonJS (`require` / `module.exports`), not ES modules. ESLint is set to `sourceType: "script"`.
- Routes never touch data directly. Add or change data operations in `db/store.js` and call them from the route.
- Send errors as `res.status(<code>).json({ error: "<message>" })`, and `return` early from the handler.
- Convert `:id` params with `Number(req.params.id)` before looking them up. Store IDs are numbers.
- Write tests with `node:test` + `node:assert` + `supertest` against the exported `app`. Don't add Jest/Mocha and don't start a real server.
- Config goes in `.env` (git-ignored). Document new variables in `.env.example`. Never commit real secrets.

## Architecture

- `server.js` builds the Express app, mounts one router per resource (`/users`, `/health`), and exports `app`. It only calls `listen()` when it's run directly (`require.main === module`). That's what lets tests import it.
- `routes/<resource>.js` each export an `express.Router()`. A new resource gets its own file and a matching `app.use()` in `server.js`.
- `db/store.js` keeps data in module-level variables. State resets on restart but is shared by every test in the same process, so tests shouldn't assume an exact user count or specific IDs.
- `getAllUsers()` returns the live array, not a copy. Anything that mutates the result changes the store.
