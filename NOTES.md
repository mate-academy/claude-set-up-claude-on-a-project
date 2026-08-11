# NOTES.md

## CLAUDE.md choices

I kept `CLAUDE.md` to four short sections: a one-line project description, the commands I'd actually run (`npm run dev`, `npm test`, running a single test file, `npm run lint`), the architecture (entry point, one router per resource, data access through `db/store.js`), and two conventions (route handlers return JSON errors directly with no shared middleware, and data access always goes through the store rather than inline arrays).

I left out a components/file listing, since that's discoverable by reading the repo, and generic advice like "write tests" or "don't commit secrets" — Claude already defaults to that, and it isn't specific to this project. I also left out anything from the course README about grading criteria or submission steps, since that's a one-off task note, not lasting project context.

## Permission rules

I added:
- an **allow** rule for `Bash(npm test:*)`, since it's a safe, frequently-run command I don't want to approve every time.
- an **ask** rule for `Bash(git push:*)`, so I get a chance to review before code leaves my machine.
- a **deny** rule for `Read(./.env)` and `Bash(git push --force:*)`.

Without the deny rule, Claude could read `.env` and potentially leak real secrets into its context or output, or run a force-push that overwrites remote history/other people's commits. Denying both up front means those actions are blocked outright rather than relying on me catching them in the moment.
