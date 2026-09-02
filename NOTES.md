# Notes

## CLAUDE.md choices

Kept it to four short sections: one-line description, commands, conventions, architecture. Each convention is a real rule I could see myself repeating in every session ("routes stay in `routes/`, data access goes through `db/store.js`") rather than something obvious from reading the file once.

Left out: any explanation of *what* each route does (the code is short and self-explanatory — Claude can read `routes/users.js` in one shot), the `.env.example` contents, and any mention of specific line numbers or file sizes, since those change and would just rot. No secrets or config values are in the file — there aren't any in this starter project, but the rule stands regardless.

## Permission rules

- **Allow**: `npm test` and `npm run lint` — read-only, side-effect-free commands I want Claude to run without asking every time, since re-confirming a test run adds friction with no safety benefit.
- **Deny**: reading `./.env` and force-pushing. `.env` denial matters because even though this starter has no real secrets, the convention is that real credentials would live there — Claude reading it into context (and potentially quoting it back, or including it in a commit message or PR description) is the kind of leak that's hard to undo. Without the deny rule, a well-meaning "just check the env config" request could expose a real API key. Force-push is denied because it can silently discard a teammate's commits on a shared branch — a mistake that's only reversible if someone still has the old ref.
- **Ask**: `git push` — pushing is visible to others and can trigger CI/deploys, so I want a chance to review the diff each time rather than have it happen automatically as part of a longer task.

## Verification
Ran `/memory` in a fresh session — `CLAUDE.md` shows as loaded. Ran `/permissions` — allow/ask/deny rules all show as configured. Asked "How do I run the tests here?" and got `npm test` back without further explanation needed.
