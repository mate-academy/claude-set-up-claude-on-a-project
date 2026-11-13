# Notes

## What changed CLAUDE.md

The first version came from `/init`. I then made these changes:

- **Added an Architecture section.** This one was missing. It describes the `server.js` entry point, one router file per resource in `routes/`, and `db/store.js` as the only data layer. The task asks for this, and it tells Claude where new code goes without having to explore the repo every session.
- **Moved two lines from Conventions to Architecture.** "One router file per resource" and "data access only through `db/store.js`" describe how the project is organised rather than code style. Keeping them in one place avoids repeating them.
- **Removed the Gotchas section.** It warned that data is in memory and resets on restart, and that `.gitignore` doesn't ignore `.env` because of leading spaces. The in-memory note now lives in Architecture. The `.gitignore` problem is a one-off bug to fix, not a lasting rule, so it doesn't belong in a file that loads every session.
- **Removed the Git workflow section.** It named the branch for this course project only (`set-up-claude`), so it would be out of date by the next project. My personal settings already stop Claude from committing or pushing without asking.
- **Clarified the error convention.** Routes return `{ error: "<message>" }` with a matching status code, not a raw error object passed straight through. Raw error objects can leak internal details and give clients inconsistent responses.
- **Added a new convention: a one-line comment before every new function.** This keeps the code easy to read while I'm learning, and Claude follows it without having to ask.

## Permission rules

The rules live in `.claude/settings.json`, which is committed so everyone working on the repo gets the same safety net.

- **Allow:** `npm test` and `npm run lint`. These are the checks I run most often, and they only read code and report results, so Claude can run them without asking. That lets it check its own changes quickly.
- **Ask:** `git commit` and `git push`, because both change history or reach the shared remote, so I want to see each one first. Also `cp` and `rm`, which can overwrite or delete files that can't be recovered.
- **Deny:** reading `.env`, and `git push -f` / `git push --force`.

**What could go wrong without the deny rules:**

- **`Read(./.env)`:** `.env` is where real secrets go (database URLs, API keys). Without this rule, Claude could open the file while debugging config. The secrets would then be sent to the model and could show up in its output, in logs or in code it writes. This repo's `.gitignore` also doesn't ignore `.env` yet (its entries have leading spaces), so the deny rule is one of the few things protecting the file.
- **`git push --force` / `-f`:** a force push overwrites the remote branch with my local one. Commits that exist only on the remote, such as a teammate's work or review fixes, would be lost, and the course reviewer could see a broken branch history. An "ask" rule would let me approve it by accident; deny means it can never happen.

## Verification

I checked: "/memory" command showed the project scoped CLAUDE.md and user scoped CLAUDE.md loaded and "/permissions" command showed my new rules and rules from user settings
