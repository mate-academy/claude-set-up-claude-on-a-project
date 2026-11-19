# CLAUDE.md

Starter Express API (CommonJS, Node 22 in CI) with in-memory data. No database; data resets on restart.

## Commands

- `npm install` — install dependencies
- `npm run dev` — start the API with `node --watch` on http://localhost:3000 (`PORT` env overrides)
- `npm start` — start without watch mode

## Architecture
- `db/store.js` — the only data layer. Exposes `getAllUsers`, `getUserById`, `createUser` over module-level arrays and an id counter. Routes call the store; they never touch the arrays directly. Add new data access here.
- `tests/` — tests import `app` from `server.js` and call it with supertest. New endpoints get tests in the same style.

Note: `.env.example` documents `PORT`, but nothing loads `.env` (no dotenv dependency). Only real environment variables take effect.

## Conventions

- Use `require`/CommonJS, not ES `import`; the ESLint config is `sourceType: "script"`.
- Unused function arguments named `_`, `req`, `res`, or `next` are allowed by lint; any other unused variable is a warning.
