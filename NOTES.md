# NOTES.md

## What went into CLAUDE.md, and what was deliberately left out

I kept the CLAUDE.md lean and focused on three things that require context to act on:

**Included:**
- **Commands** — The three npm scripts needed to develop and test. Single test command because this project is small enough that running one file is useful.
- **Conventions** — Two actionable rules specific to this project: route structure (one file per resource) and data access pattern (always go through `db/store.js`). These matter because future changes will either follow or break the pattern.
- **Architecture** — A file-by-file explanation of how data flows, plus a note about swapping the store for a real database. This is non-obvious without reading multiple files.

**Left out:**
- File listings or obvious structure that's visible in the directory
- Installation steps (README covers this)
- Generic practices like "write tests" or "use meaningful names"
- Individual function signatures or API response shapes (these are readable in the code)
- Notes on `.env` handling (the `.env.example` file and README explain it)

The rationale: shorter files are stronger. Every line should answer a question that reading the code wouldn't.

## Permission rules

**Allow rules:**
- `npm run dev`, `npm test`, `npm run lint`, and `node --test` — these are safe, deterministic commands run frequently during development. No permission prompt saves time.

**Deny rule:**
- `Read(./.env)` — even though `.env` is git-ignored and won't be checked in, it contains example secrets. Prevents accidental exposure if the real `.env` file is created.
- `git push --force` — prevents accidentally force-pushing and rewriting shared history.

**Ask rule:**
- `git push` — any push requires a confirmation. This catches accidental pushes on the wrong branch or with unintended commits, which are hard to undo.

**What could go wrong without the deny rule:**
Without blocking `Read(./.env)`, Claude could expose a real `.env` file containing API keys or database credentials if the file exists but shouldn't be committed. The force-push deny prevents accidental history rewrites if a force-push is mistakenly invoked in a troubleshooting moment.
