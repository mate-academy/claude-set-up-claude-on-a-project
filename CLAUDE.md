# CLAUDE.md

## Project

Simple Express.js REST API used for learning Claude Code configuration and project workflows.

## Commands

```bash
npm install
npm run dev
npm test
npm run lint
```

## Conventions

- Follow the existing Express.js project structure.
- Keep one resource per route file in the `routes/` directory.
- Access application data only through `db/store.js`.
- Do not modify `.env` or commit secrets.
- Keep changes small and focused.

## Architecture

- `server.js` is the application entry point.
- Each API resource has its own file inside `routes/`.
- `db/store.js` contains the in-memory data layer.
- Tests are located in the `tests/` directory.
