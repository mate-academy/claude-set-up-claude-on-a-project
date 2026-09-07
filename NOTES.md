# NOTES

## What's in CLAUDE.md
It covers the commands to run (`npm install`, `npm run dev`, `npm test`, `npm run lint`), the app's architecture (Express entry point, per-resource routers, in-memory store), and coding conventions (CommonJS, ESLint rules). This is the info Claude Code needs on every run to work in this repo without re-discovering it each time.

## What's left out, and why
Things that change often or are easy to derive by reading the code aren't included — e.g. current test results, specific route implementations, or dependency versions. Putting those in CLAUDE.md would just go stale and require upkeep; `git log`, `package.json`, and the source itself are the source of truth for that.

## Permission rules added (via `/permissions`)
- **Allow `npm test`** — safe, read-only-in-effect command, runs without prompting.
- **Ask before `git push`** — pushing affects the shared remote, so it should require explicit confirmation each time.
- **Deny reading `.env`** — blocks Claude from ever reading the real secrets file.
- **Deny `push --force:*`** — blocks force-pushes outright, since they can overwrite/lose remote history.

### Why the `.env` deny rule matters
Without it, Claude could read `.env` directly (it's git-ignored but not Claude-ignored) and any real secrets in it — e.g. a `DATABASE_URL` with credentials — could end up quoted back in chat output, logs, or copied into a file Claude writes, defeating the whole point of keeping it out of git.
