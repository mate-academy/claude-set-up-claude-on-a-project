# NOTES.md

**What did you put in your CLAUDE.md, and what did you deliberately leave out, and why?**

I put in the commands to run, test, and lint the API, the project's conventions (new routers go in `routes/` and get mounted in `server.js`, all data access goes through `db/store.js`'s exported functions, and the `require.main === module` guard around `app.listen` must stay), and a short architecture map showing `server.js` → `routes/*.js` → `db/store.js` plus how tests exercise the app via `supertest`. I left out anything easily derived from reading the code, like actual route definitions or data shapes, because that goes stale as the code changes and just adds noise. I also skipped generic style/commit conventions and deployment/CI notes since neither applies to this small practice repo.

**Which permission rules did you add, and what could go wrong without your deny rule?**

I added an allow rule for `npm test:*` and `npm run lint:*` (safe, no side effects), an ask rule for `git push:*` (confirms before touching the shared remote), and deny rules for `Read(./.env)` and `git push --force:*`. Without the `.env` deny rule, Claude could read and leak secrets like API keys while exploring the project. Without the `--force` deny rule, Claude could overwrite or destroy commits on a shared branch irreversibly, which is exactly the kind of hard-to-reverse action that shouldn't happen without explicit user action.
