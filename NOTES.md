# Notes: Claude Code setup

## What's in CLAUDE.md, and what I left out

I kept `CLAUDE.md` to the four required parts, and each line covers something Claude would otherwise get wrong. **Commands** lists `dev`, `test`, `lint` and how to run a single test file. It also notes that CI runs lint before the tests, so both must pass. **Conventions** holds rules Claude can't safely guess: use CommonJS rather than ES modules (ESLint is set to `sourceType: "script"`), return errors as JSON `{ error: "..." }`, write tests with `node:test` + `supertest` against the exported `app` instead of adding Jest, and access data only through `db/store.js`. **Architecture** covers the parts that cause bugs if missed: `server.js` exports `app` and only listens when run directly, there is one router per resource, and the store is in memory and its state is shared across tests.

I left out a file-by-file listing, because Claude can read the tree itself. I also left out anything already obvious from `package.json`, setup steps from the README, and course and assignment instructions, which are one-off and not project guidance. Nothing from `.env` went in, so no secrets are in the file. Shorter means every line actually gets followed.

## Permission rules, and why the deny rules matter

- **Allow:** `npm test`, `npm run lint`, `node --test`. These are safe, read-only checks I want Claude to run often without prompting me.
- **Ask:** `git push`. Pushing publishes work, so I want to confirm each time.
- **Deny:** `Read(./.env)`, `git push --force`, `git push -f`.

Without the `.env` deny rule, Claude could read real secrets (API keys, database URLs) into its context and repeat them in output or in a commit. Without the force-push deny rule, a mistaken command could overwrite the remote branch's history and lose other people's commits. Deny takes precedence over ask, so force-pushes are blocked even though they also match `git push`. These rules match command text, so they aren't airtight. For example, `cat .env` in a shell isn't covered by the `Read` rule.

While setting this up I found that the `.gitignore` lines after `node_modules/` are indented. Git treats the leading spaces as part of the pattern, so `.env` and `.claude/settings.local.json` are **not** actually ignored. Until that's fixed, I stage files explicitly by name instead of using `git add .`.

## Verification

- `/memory`: CLAUDE.md shows as loaded. _(confirm)_
- `/permissions`: the allow / ask / deny rules above are listed. _(confirm)_
