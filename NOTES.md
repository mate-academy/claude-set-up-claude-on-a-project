# NOTES.md

## What I put in CLAUDE.md — and what I left out

The four sections I included are things Claude cannot derive from reading a single file:

- **Description** — one line so Claude knows the scope immediately and doesn't over-engineer changes.
- **Commands** — the exact scripts to run, including how to target a single test file (`node --test tests/users.test.js`), which isn't in `package.json`.
- **Architecture** — the relationship between `server.js`, `routes/`, and `db/store.js` requires reading three files to understand; putting it here saves that traversal every session.
- **Conventions** — rules like "all data access goes through `db/store.js`" are invisible from any one file but break things silently if ignored.

What I left out:
- File listings and folder structure — `ls` reveals these instantly and they go stale.
- Generic practices (error handling, testing, security) — stated in the README as things to omit, and Claude already knows them.
- One-off course instructions — those belong in the README, not in a file Claude loads every session.

## Permission rules — and what the deny rules protect

**Allow rules** (`npm test`, `npm run lint`, `npm run dev`) cover the commands run in every session. Without them, Claude would prompt for confirmation on routine operations that have no destructive side effects.

**`Read(./.env)` deny** — the `.env` file holds real secrets (database URLs, API keys). Without this rule, Claude could read and inadvertently leak credentials in a response or a generated file.

**`Bash(git push --force:*)` deny** — a force-push rewrites remote history and can permanently discard teammates' commits. Denying it outright means this can never happen by accident, even if Claude reasons its way into thinking it's necessary.

**`Bash(git push:*)` ask** — a normal push is usually intentional but affects the shared remote, so a confirmation prompt is the right friction level.

## Verified with /memory

Ran `/memory` and confirmed that the contents of `CLAUDE.md` were present in memory — Claude had indexed the project instructions and they were visible in the memory output.

## Verified with /permissions

Ran `/permissions` and confirmed all five rules were present and correctly categorised:

- Allow: `npm test`, `npm run lint`, `npm run dev`
- Ask: `Bash(git push:*)`
- Deny: `Read(./.env)`, `Bash(git push --force:*)`
