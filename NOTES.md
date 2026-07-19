# NOTES.md

## CLAUDE.md

I kept it to four things: a one-line description, the commands I actually run (`npm run dev`, `npm test`, `npm run lint`, plus how to run a single test file), a short architecture note (entry point, one router per resource, `db/store.js` as the only data-access layer), and two conventions (route handlers must go through the store, not touch data directly; `.env` holds real secrets).

I left out a file-by-file directory listing and generic advice (write tests, handle errors, don't commit secrets) — that's either obvious from reading the code or already covered by ESLint/`.gitignore`. Anything not load-bearing for a future Claude session just adds noise it has to re-read every time.

## Permission rules

`.claude/settings.json` allows the three commands I run constantly (`npm test`, `npm run lint`, `npm run dev`) so Claude doesn't stop to ask for routine, safe, local actions.

It asks before `git push` — pushing affects the shared remote, so I want a chance to look at what's going out first.

It denies reading `.env` and force-pushing. Without the `.env` deny rule, Claude could read real secrets straight out of a file that's git-ignored specifically so they never leave the machine — an agent with shell access could then leak them into a commit, a log, or a response. Without the force-push deny rule, an agent chasing "fix the push" could overwrite remote history and destroy other people's commits.
