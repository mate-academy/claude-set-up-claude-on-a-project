
# CLAUDE.md

## Project Overview

Starter Express API. In-memory store (no persistence).

## Commands

```bash
npm run dev      # start with auto-reload
npm test         # run integration tests
npm run lint     # check code style
```

## Conventions

- One file per resource in `routes/`, each exports an Express router
- All data queries through `db/store.js` (it's in-memory and resets on restart)
- Validate request body in route handlers before calling store functions

## Architecture

`server.js` mounts routers. Tests import `app` and use supertest without opening a port.
