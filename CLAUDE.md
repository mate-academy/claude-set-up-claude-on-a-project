# CLAUDE.md

This is the starter Express API for a Claude Code learning course. 

## Commands

```
npm install
npm run dev      # starts the API on http://localhost:3000, restarts on change
npm start        # starts the API without watch mode
npm test         # runs tests (Node's built-in test runner)
npm run lint     # checks code style with ESLint
```

Run a single test file with `node --test tests/users.test.js`.

## Conventions

- Copy `.env.example` to `.env` for local config; never commit `.env` (it's git-ignored).
- ESLint config (`.eslintrc.json`) extends `eslint:recommended`; fix lint warnings rather than disabling rules inline.

## Architecture

- `server.js` is the entry point: builds the Express app, mounts routes, and only calls `app.listen` when run directly (`require.main === module`) — this lets `tests/` import `app` from `server.js` without opening a real port.
- Routes live in `routes/`, one file per resource (`users.js`, `health.js`), each exporting an Express `Router` mounted in `server.js`.
- `db/store.js` is a tiny in-memory data store standing in for a real database — data resets on every server restart. Routes call into it rather than holding state themselves.
- Tests in `tests/` use Node's built-in test runner (`node:test`) with `supertest` to make HTTP requests against the exported `app`.
