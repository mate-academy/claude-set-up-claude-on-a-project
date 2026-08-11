## CLAUDE.md choices

I kept it to four short sections: a one-line description, the three npm commands I actually run, two conventions that aren't obvious from skimming a single file (the "route files stay thin, `db/store.js` owns data access" rule, and the `{ error }` response shape), and a three-line architecture note pointing at `server.js`, `db/store.js`, and the routes pattern.

I left out: a file-by-file inventory (Claude can `ls` and read files itself), the ESLint rule details (already in `.eslintrc.json`, no need to duplicate), anything about deployment or environment variables beyond what `.env.example` already documents, and any commentary on this being a course exercise — that's true today but stops being true the moment this file is reused on a real project.

## Permission rules

- **Allow:** `npm test` and `npm run lint` — read-only, safe to run without asking, and commands I'll want Claude running constantly while iterating.
- **Ask:** `git push` — cheap to confirm each time, and it's the one command that reaches outside my machine.
- **Deny:** reading `.env` and `git push --force`. Without the `.env` deny rule, a "what's misconfigured?" debugging session could dump real secrets into the conversation. Without the force-push deny rule, an over-eager rebase-and-push could silently overwrite shared branch history.

## Verification

[Fill in after you check it yourself: run `/memory` in a fresh Claude Code session and confirm `CLAUDE.md` shows as loaded; run `/permissions` and confirm the allow/ask/deny rules appear; ask "How do I run the tests here?" and confirm Claude answers from `CLAUDE.md` without you explaining.]
