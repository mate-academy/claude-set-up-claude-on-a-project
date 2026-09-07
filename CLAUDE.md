## Project
A small Express API used as the starter project for a Claude Code course.

## Commands
npm run dev              # start the API with auto-reload on http://localhost:3000
npm start                # start the API without auto-reload
npm test                 # run all tests (Node's built-in test runner)
npm run lint             # run eslint

## Conventions
- Use common modules in project, not ESM.
- Use npm run dev when testing, not npm start.

## Architecture
- `server.js` is the entry point. It builds the Express `app`, mounts route modules, and only calls `app.listen` when the file is run directly (`require.main === module`) — this lets `tests/users.test.js` `require("../server")` and drive it with `supertest` without opening a real port.
- Routes live one file per resource under `routes/` and are mounted in `server.js` under their resource path.
- All data access goes through `db/store.js`, a tiny in-memory module. There is no persistence layer; state resets on every restart. Route handlers should not manipulate the `users` array directly — go through the store's exported functions.
- CI (`.github/workflows/ci.yml`) runs `npm install`, `npm run lint`, then `npm test` on every push and PR — keep both passing.
