# Project Instructions

## Project Overview
This is a Node.js Express API project used for Claude Code training.

## Architecture
- `server.js` is the main entry point of the Express API.
- `routes/` contains one route file per resource.
- `db/store.js` handles data access and storage.

## Commands
- Install dependencies: `npm install`
- Start the application: `npm start`
- Run in development mode: `npm run dev`
- Run tests: `npm test`
- Check code quality: `npm run lint`

## Coding Conventions
- Use `async/await`, not nested callbacks, for asynchronous operations.
- Use the existing Express route structure, not new routes directly in `server.js`.
- Use `db/store.js` for data access, not direct data manipulation inside route handlers.
- Use the existing project naming and formatting conventions, not inconsistent new styles.
- Use focused changes, not unrelated refactoring.

## Working Rules
- Read relevant existing files before proposing changes.
- Explain the proposed plan before modifying files.
- Ask for approval before making changes.
- Do not modify application code unless explicitly requested.
- Do not expose credentials, tokens, or secrets.
- Run relevant tests after approved code changes.
- Keep changes small and focused.
