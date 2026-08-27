# NOTES.md

## CLAUDE.md choices

I kept it to four short sections: a one-line project description, commands (dev/test/lint plus how to run a single test file), architecture (the `server.js` testability pattern, one route file per resource, `db/store.js` as the data layer), and two conventions that aren't obvious from skimming one file alone (routes go through the store, and handlers return JSON errors with status codes instead of throwing).

I left out things that are trivially discoverable by reading the code once — the exact fields on a user, the health check's response shape, the full list of files. I also left out generic advice ("write tests", "don't hardcode secrets") since that's true of every project and doesn't help Claude do anything differently here. I noted this repo is a course exercise where the app code itself shouldn't be touched, since that's context Claude can't infer from the files alone and would otherwise be a reasonable thing to "helpfully" refactor.

## Permission rules

- **Allow**: `npm test`, `npm run lint`, and `node --test` — read-only/side-effect-free commands I run constantly, so I don't want to be prompted every time.
- **Ask**: `git push` — I want a chance to look at what's being pushed before it happens, even though it's a normal part of the workflow.
- **Deny**: reading `.env`, `git push --force`, and `rm -rf`. Without the `.env` deny rule, Claude could read real secrets into context (and potentially echo them back or into a commit) while just trying to be helpful with configuration. Without the force-push deny, a routine "clean up my branch" request could overwrite someone else's commits on a shared branch with no easy recovery. Without the `rm -rf` deny, a misinterpreted cleanup instruction could delete files well beyond what was intended.

## Verification

Ran `/memory` in a fresh session — it opened `CLAUDE.md` at the project root, confirming it's loaded. Ran `/permissions` and confirmed the allow (`npm test`, `npm run lint`, `node --test`), ask (`git push`), and deny (`.env` read, `git push --force`, `rm -rf`) rules from `.claude/settings.json` all show up.
