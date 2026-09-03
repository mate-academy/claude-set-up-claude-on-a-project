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

- Use the existing Express.js project structure, not a custom layout.
- Use one route file per resource in the `routes/` directory, not multiple resources in the same file.
- Use `db/store.js` for all data access, not direct data manipulation inside route handlers.
- Use environment variables for configuration, not hard-coded values or committed secrets.
- Keep changes small and focused, not large refactors.
- Use the existing coding style, not inconsistent formatting.


## Architecture

- `server.js` is the application entry point.
- Each API resource has its own file inside `routes/`.
- `db/store.js` contains the in-memory data layer.
- Tests are located in the `tests/` directory.
