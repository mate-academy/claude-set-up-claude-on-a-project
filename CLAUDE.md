# CLAUDE.md

Express.js REST API managing users in memory.

## Commands

```bash
npm run dev   # port 3000, file-watching
npm test
npm run lint
```

## Conventions

- CommonJS (`require`/`module.exports`), not ESM
- Routes return structured JSON errors with correct HTTP status codes

## Architecture

- `server.js` — mounts routes, exports `app` without binding a port
- `routes/` — one file per resource, each exports a router
- `db/store.js` — in-memory store; resets on restart
