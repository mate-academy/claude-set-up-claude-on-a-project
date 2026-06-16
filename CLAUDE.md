# CLAUDE.md

A minimal Express REST API used as a learning project for Claude Code course exercises.

## Commands

```bash
npm install        # install dependencies (run once after cloning)
npm run dev        # start API with file-watching on http://localhost:3000
npm test           # run all tests (Node built-in test runner)
npm run lint       # check code style with ESLint
```

To run a single test file: `node --test tests/users.test.js`

## Architecture

- `server.js` — entry point; mounts routes and exports `app` without binding a port (so tests can import it without starting a real server)
- `routes/` — one file per resource (`users.js`, `health.js`); each file creates an Express router and exports it
- `db/store.js` — in-memory data layer; all data access goes through its exported functions; data resets on restart

## Conventions

- Use CommonJS (`require`/`module.exports`), not ES modules
- Route files talk to `db/store.js` functions only — no direct data manipulation in route handlers
- Tests use Node's built-in `node:test` + `node:assert` with `supertest`; no external test framework
- All config goes in `.env` and give example in .env.example
