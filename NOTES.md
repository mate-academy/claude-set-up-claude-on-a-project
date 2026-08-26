# NOTES.md

## CLAUDE.md

I kept it to commands and architecture: the `npm` scripts, how to run a single test file, and the parts of the code that aren't obvious from any one file — mainly that `server.js` only calls `app.listen()` when run directly, which is what lets `tests/users.test.js` import `app` and hit it with supertest without opening a real port.

I left out a "Conventions" section. The only project-specific rule I found was the ESLint `no-unused-vars` argsIgnorePattern for `req/res/next`, which is lint config, not a behavioral convention worth stating separately. I also left out anything from the README that describes the course assignment itself (branch/PR steps, definition of done) since that's not guidance for working in the code.

## Permissions (`.claude/settings.json`)

- **allow**: `npm test`, `npm run lint`, `npm run dev` — the commands this repo runs constantly and that only affect the local process (no network calls, no writes outside the project).
- **ask**: `git push` — reversible but visible to others, worth a confirmation each time.
- **deny**: reading `.env`, and `git push --force`.

Without the `.env` deny rule, Claude could read real secrets into context the moment a `.env` file exists locally (it's git-ignored, but not Claude-ignored) and there'd be nothing stopping it from quoting them back in a response or a commit. Without the force-push deny rule, Claude could overwrite remote history on a shared branch during an otherwise routine git cleanup.