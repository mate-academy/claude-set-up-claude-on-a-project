# NOTES

## CLAUDE.md

**Included:** A short project description (minimal Express API, in-memory store, no real DB), the exact commands to run/test/lint (including how to run a single test), and the two conventions that aren't obvious from skimming the code — that routes never touch data directly and always go through `db/store.js`, and that `server.js` only calls `app.listen` when run directly so tests can import the app with supertest instead of hitting a real port.

**Left out:** Deep architectural explanations, a file-by-file walkthrough, coding style rules (naming, formatting), and anything ESLint/Prettier already enforce. The reasoning is that CLAUDE.md should hold context that isn't cheaply rediscoverable by reading the code — commands, non-obvious conventions, and "gotchas" like the store being reset on every restart. Anything derivable by opening the file (e.g., what routes exist, what dependencies are used) doesn't belong here since it just goes stale and duplicates the source of truth.

## Permissions (.claude/settings.json)

- **allow:** `Bash(npm test:*)` — running tests is safe, frequent, and read-only with respect to the repo/remote, so it shouldn't require a prompt every time.
- **ask:** `Bash(git push:*)` — pushing affects shared state (the remote), so it should always get a confirmation rather than running silently.
- **deny:** `Read(./.env)`, `Bash(git push --force:*)`

**Why the deny rules matter:**
- Without `Read(./.env)` denied, a prompt (or a summarization/logging step) could pull real secrets (API keys, DB credentials) into the conversation/context, where they might get echoed back, pasted into a commit, or sent to an external service. Since this is only a course starter with an in-memory store, `.env` shouldn't even be needed, but blocking it removes the risk outright rather than relying on discipline.
- Without `Bash(git push --force:*)` denied, an agent (or a normal `ask`-level approval given without noticing the `--force`) could rewrite remote history and clobber a teammate's commits irreversibly. Force-push is exactly the kind of hard-to-reverse, shared-state action that shouldn't be reachable even via an "ask" prompt someone might approve without reading closely — denying it outright removes that failure mode.
