# NOTES.md

## CLAUDE.md

I kept it to four short sections: a one-line description, the three commands I actually run (`npm run dev`, `npm test`, `npm run lint`, plus how to run a single test file), two real conventions (CommonJS not ESM, data access only through `db/store.js`), and a short architecture note on how `server.js`, `routes/`, and `db/store.js` fit together.

I left out: a file-by-file walkthrough (the tree is small enough to discover by reading), anything about `.env`/secrets (already covered by `.env.example` and `.gitignore`), and any mention of the course/assignment itself — none of that helps Claude do the work.

## Permissions

`.claude/settings.json` allows `npm test` and `npm run lint` since I run both constantly and they're read-only/side-effect-free. It asks before `git push` so nothing leaves my machine without a check. It denies reading `.env` and force-pushing.

Without the `.env` deny rule, Claude could read real secrets (DB URLs, API keys) straight into context the moment a real `.env` exists, and that content could end up quoted back in a response or a commit. Without the force-push deny rule, a routine "fix the branch" request could silently rewrite shared history and drop someone else's commits.
