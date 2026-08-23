Notes section was removed from the initial version of CLAUDE.md since it has no value and could be treated as a 'noise':
```
## Notes

- This project is intentionally not being extended with new app features here — see `README.md` for the course task, which is about configuring Claude Code (`CLAUDE.md` + `.claude/settings.json`), not changing `server.js`/`routes/`/`db/`.
```

Keep in CLAUDE.md:
- short description of what project does:
```
Starter Express API for the Claude Code course — a minimal REST API used as a real codebase to practice setting up Claude Code, not for feature work.
```
- commands section with the most common project commands:
```
- `npm run dev` — start the API with auto-reload (`node --watch server.js`) on http://localhost:3000
- `npm start` — start the API without watch mode
- `npm test` — run all tests (Node's built-in test runner, via `node --test`)
- `npm run lint` — run ESLint over the project
```
- conventions section with two solid rules Claud could follow without asking a question:
```
- Never commit changes yourself — leave all changed files uncommitted and unstaged for a human to review and commit.
- Run `npm run lint` on any file you change and fix reported issues before considering the change done, to keep formatting consistent with the project's ESLint conventions.
```
- architecture section with a few lines on how the project is organised:
```
- `server.js` — entry point; builds the Express app, mounts routers, and only calls `app.listen` when run directly (`require.main === module`), so `tests/*.test.js` can `require("../server")` and hit routes via `supertest` without opening a real port.
- `routes/` — one router file per resource (`users.js`, `health.js`), mounted in `server.js` under its path prefix (e.g. `/users`, `/health`).
- `db/store.js` — in-memory data access layer; all data reads/writes go through its exported functions (`getAllUsers`, `getUserById`, `createUser`). Data resets on every server restart — there is no real database.
- Routes validate input and return JSON error bodies (`{ error: "..." }`) with the appropriate status code (400, 404) directly; there is no separate validation or error-handling middleware layer.
```

Added the following permissions:
- file `.claude/settings.json`
```
/permissions                                                                 
  ⎿ Added allow rule run tests with npm test command
     Added deny rule do not read .env file
     Added ask rule ask if commit is allowed
```
- allow rule include common command for testing that is running pretty often, so it is usefull to have it there to avoid confirmation each time we need to run tests
- deny rule is important to have, so all project secrets where protected and won't be exposed
- ask rule make sure user will always know if claude about to make a commit and can controll this procces