# NOTES

## CLAUDE.md

I kept it to four short sections: a one-line project description, the three `npm` commands (`dev`, `test`, `lint`) plus how to run a single test file, two real conventions (CommonJS over ESM, and the `res.status().json({ error })` pattern for failures), and an architecture note covering the `server.js` entry point / `require.main === module` guard, one router per resource in `routes/`, and data access going through `db/store.js`.

I left out anything obvious from reading the code directly — e.g. what each route does line by line, the shape of the in-memory user objects, ESLint's exact rule config — since Claude can just read those files, and restating them only gives the file more to go stale against. I also left out the course README's assignment instructions themselves (task list, definition of done, submission steps): that's guidance for me, not for Claude operating on the codebase.

## Permissions (`.claude/settings.json`)

- **allow**: `Bash(npm test:*)` — the test command is safe and I run it constantly, so it shouldn't need confirmation every time.
- **ask**: `Bash(git push:*)` — pushing is low-risk but outward-facing (it updates the remote), so I want a chance to glance at what's being pushed first.
- **deny**: `Read(./.env)` and `Bash(git push --force:*)` — `.env` is where real secrets would live once this app is more than a starter, so Claude should never read it into context, even by accident while exploring the repo. Without that rule, a secret could end up quoted back in conversation or a generated file. `git push --force` is denied because it can silently overwrite remote history / other people's commits; without the deny rule, an agent chasing a merge conflict or a "clean up the branch" request could force-push over work that isn't recoverable locally.
