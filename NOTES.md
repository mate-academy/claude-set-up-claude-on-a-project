# Notes

## What I put in CLAUDE.md — and what I left out

**Included:**

- A one-line project description so Claude immediately knows what it's working on.
- The three main commands (`dev`, `test`, `lint`) — these are the commands you run most and Claude needs to know them to be useful.
- Conventions that aren't obvious from the code alone: CommonJS over ESM, one route file per resource, data access through `db/store.js`, and the test stack (`node:test` + `supertest` instead of Jest/Mocha).
- The architecture overview showing the relationship between `server.js`, `routes/`, `db/`, and `tests/` — just enough for Claude to know where things go.
- The `require.main === module` pattern, because it's a non-obvious design choice that matters when writing tests.

**Deliberately left out:**

- The contents of `.env.example` — Claude shouldn't need secret config, and including it would clutter the file.
- `package.json` fields, dependency versions, or Node version — Claude can read `package.json` directly.
- One-off tasks or TODOs — those belong in issues, not in a persistent instruction file.
- Anything about how to install or set up the project — that's in the README and obvious from the repo.

## Permission rules

**Allow:** `npm test` and `npm run lint` — these are safe, read-only commands that Claude should be able to run freely without asking every time.

**Ask:** `git push` — pushing changes to the remote is an action I always want to confirm before it happens.

**Deny:**
- `Read(./.env)` — the `.env` file can contain real secrets (database URLs, API keys). Claude should never read it.
- `git push --force` — force-pushing rewrites remote history and can destroy other people's work. Without this deny rule, Claude could accidentally overwrite commits on a shared branch.
- `rm -rf` — prevents accidentally deleting large directory trees.
