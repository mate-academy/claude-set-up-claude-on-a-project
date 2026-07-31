# NOTES.md

I included the four most-used npm commands (`dev`, `test`, `lint`, `start`) because they are the daily workflow. I added two core conventions that prevent common mistakes: using CommonJS throughout (not mixing in ESM), and accessing data only through `db/store.js` so route files don't manipulate user arrays directly. The architecture section covers the three key pieces—entry point, route files, and the data layer—without listing every function or file path, since those are easy to read in the code itself.

I left out:
- The sample seed data and user IDs (visible in `db/store.js`)
- Details about supertest or the test framework (Claude can read the test file)
- The specific ESLint rules (already in `.eslintrc.json`)
- Setup instructions like `npm install` (implied by the README)
- The fact that data is in-memory and non-persistent (kept this because it's a key design constraint that affects how features are tested)

## Permissions
In .claude/settings.json I added:

**Allow:** `Bash(npm test:*)` and `Bash(npm run lint:*)` — these are safe, read-only checks that give fast feedback during development.

**Ask:** `Bash(git push:*)` — confirms before pushing, so I can review what's being sent upstream.

**Deny:** `Read(./.env)` and `Bash(git push --force:*)` — these prevent two classes of mistakes:
- Without the `Read(./.env)` deny rule, Claude could accidentally read secrets from the `.env` file and commit or log them.
- Without the `git push --force` deny rule, an overeager fix to a shared branch could rewrite history and break teammates' work. Force-push should always be deliberate and discussed first.
