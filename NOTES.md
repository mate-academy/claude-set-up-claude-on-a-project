# NOTES.md

## CLAUDE.md

I included: a one-line description, the commands I'd actually run (`npm run dev`, `npm test`, running a single test file, `npm run lint`, and what CI runs), the architecture (entry point, one route file per resource, the in-memory store as the single data layer, how tests import `app` via `supertest` without opening a real port), and one convention (config through `.env`, never committed).

I left out: a file-by-file listing of `routes/` and `tests/` (that's obvious from opening the folder), any note about installing Node or npm (generic setup, not project-specific), and anything about the course/submission process (one-off, not something a future session needs to operate the code).

## Permissions

- **Allow**: `npm test`, `npm run lint`, `npm run dev` — safe, frequently-run, non-destructive commands I don't want to approve every time.
- **Ask**: `git push` — not destructive by itself, but visible to others, so I want a chance to check the branch/commit before it goes out.
- **Deny**: reading `.env` — it's git-ignored specifically to keep secrets out of version control and out of context; letting Claude read it defeats that. Also denied `git push --force`, which can silently overwrite remote history/other people's work.

Without the `.env` deny rule, Claude could read real secrets into its context (and potentially echo them back, log them, or include them in a commit/PR by mistake) the first time it needed to check a config value. Without the force-push deny rule, a routine "clean up my branch" request could rewrite shared history on the remote.
