# CLAUDE.md

Starter Express REST API with users and health endpoints.

## Commands

```bash
npm run dev
npm test
npm run lint
node --test --test-name-pattern="GET /health" tests/users.test.js  # Run one test by name
```

## Conventions

- Use CommonJS (`require`), not ES modules. `import` fails lint.
- Return errors as `{ error: "message" }`, not plain text.
- Convert `req.params.id` with `Number()` before lookups, because store IDs are numbers.
- Assert on specific users in tests, not exact counts, because tests share store state.

## Architecture

- `server.js` is the entry point. It mounts each router and exports `app` for tests.
- `routes/` holds one router per resource.
- `db/store.js` is the only data layer. Data lives in memory and resets on restart.
