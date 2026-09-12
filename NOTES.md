# NOTES.md

## CLAUDE.md Decisions

### What I included

- **Commands**: `npm run dev`, `npm test`, `npm run lint` — the three scripts Claude will need most often when working in this repo.
- **Conventions**: Three rules extracted from the actual codebase:
  - Using separate route files (not inline routes) — needed because adding endpoints requires understanding this pattern.
  - HTTP status codes (404, 400, 201) — important for consistency if new endpoints are added.
  - Eslint's unused parameter rule — subtle but enforced, worth documenting to avoid lint failures.
- **Architecture**: High-level overview of how the four key areas fit together (server setup, routes, data layer, tests). This prevents Claude from assuming a monolithic structure or missing where to add new code.

### What I deliberately left out

- **Package.json dependencies**: Listed in the file itself; no need to duplicate.
- **File-by-file breakdown**: Directory structure is obvious; listing every file wastes space.
- **Setup instructions**: `npm install` is already in the README and not something Claude will run during development.
- **Endpoint documentation**: Already inline in route files as comments. Route files are easy to find and read.
- **Generic practices**: "Write tests," "handle errors gracefully" — these are obvious and don't save time.

The goal was to capture **what requires reading multiple files to understand**, not what's already documented or trivial to discover.

## Permission Rules

### What I added

1. **Allow: `Bash(npm test:*)`** — Running tests is safe and frequent. No need to confirm each time.
2. **Ask: `Bash(git push:*)`** — Pushing code should be intentional. This prompts for confirmation before any push.
3. **Deny: `Read(./.env)`** — `.env` contains secrets (database credentials, API keys). Claude should never read it.
4. **Deny: `Bash(git push --force:*)`** — Force-pushing rewrites history and can damage the branch. Harder to recover from than a normal push, so blocked entirely.

### What could go wrong without the deny rules

**Without `Read(./.env)`:** Claude might try to read the `.env` file during debugging or when asked "what's the database connection?" It could inadvertently include secrets in commit messages, error summaries, or suggestions shown to the user. This is a serious security leak.

**Without `Bash(git push --force:*)`:** Claude could accidentally force-push over work, destroying commits or branches. Force-push is rarely needed and is too destructive to allow without explicit user intervention.
