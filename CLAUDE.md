# CLAUDE.md

A minimal Express REST API used as a course project for setting up Claude Code on a real codebase.

## Commands

```bash
npm install        # install dependencies
npm run dev        # start API with file-watching on http://localhost:3000
npm test           # run all tests (Node built-in test runner)
npm run lint       # check code style with ESLint
```

To run a single test file: `node --test tests/users.test.js`

## Architecture

- `server.js` — entry point
- `routes/` — one file per resource
- `db/store.js` — in-memory data layer

## Conventions

- Use CommonJS (`require`/`module.exports`), not ES modules — `"sourceType": "script"` is set in ESLint
- Route parameters that should be numbers must be explicitly cast: `Number(req.params.id)`
- New routes go in a new file under `routes/` and are mounted in `server.js`; do not add routes directly to the server file
