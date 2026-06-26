# CLAUDE.md

A starter Express REST API used as the base for a Claude Code course — one resource per route file, data held in memory.

## Commands

```bash
npm run dev    # start the API on http://localhost:3000 (restarts on file change)
npm test       # run tests with Node's built-in test runner
npm run lint   # check code style with ESLint
```

To run a single test file: `node --test tests/users.test.js`

Always run `npm run lint` before marking any task done.

## Conventions

- CommonJS (`require`/`module.exports`), not ES modules — `"sourceType": "script"` in ESLint config.
- Route handlers must not import from each other; all data access goes through `db/store.js`.
- `name` and `email` are required on POST `/users`; return 400 with `{ error: "..." }` for missing fields and 404 for unknown IDs.

## Architecture

`server.js` is the entry point — it wires Express, mounts routes, and only opens a port when run directly (so tests can import `app` cleanly). Routes live in `routes/`, one file per resource. All reads and writes go through `db/store.js`, which is an in-memory store that resets on restart (no real database).

## Commits

Use conventional commits. 
