# Notes: setting up Claude Code on this project

## What's in my CLAUDE.md, and what I left out

I started from the `/init` draft and cut it down to four parts: a one-line description, the three commands I actually use (`npm run dev`, `npm test`, `npm run lint`), five conventions, and a short architecture map of `server.js` → `routes/` → `db/store.js`. I wrote each convention as a rule Claude can follow without asking, for example "use CommonJS `require`, not ES `import`" and "read and write data only through `db/store.js`". These are things a new contributor (or Claude) could easily get wrong, and the code doesn't state them.

I deliberately left out:

- **The list of API endpoints.** Claude can read them straight from `routes/users.js`, and a copy would go out of date as soon as a route changes.
- **The function names in `db/store.js` and the ESLint unused-parameter setting.** Both are obvious from the files themselves, and lint enforces the second anyway.
- **`npm start` and the `/init` intro line.** I don't use `npm start` while developing, and the intro line adds nothing.
- **Anything sensitive.** No values from `.env`, only the fact that the app runs on port 3000.

Every line in the file should change what Claude does. If it wouldn't, I cut it.

## Permission rules, and why the deny rules matter

- **Allow:** `npm test` and `npm run lint`. They only check the code and change nothing, and I run them after every change. Being asked each time would just slow things down.
- **Ask:** `git push`. Pushing changes what's on GitHub, so I want to approve it myself each time.
- **Deny:** reading `.env`, plus `git push --force` / `git push -f`.

Without the `.env` deny rule, Claude could open the file where real secrets live, such as the `DATABASE_URL` password shown in `.env.example`. The secret would then end up in the chat transcript, and possibly in a commit or a pasted log. Without the force-push deny rule, a force-push could overwrite the shared history on GitHub and erase other people's commits, which is hard to undo. Deny rules take priority over ask rules, so `git push --force` stays blocked even though plain `git push` is only "ask".

The rules live in `.claude/settings.json`, which is committed so everyone on the project gets the same guardrails. Personal tweaks belong in `.claude/settings.local.json`, which `.gitignore` already keeps out of git.

## Verification

<!-- TODO: run these in a fresh `claude` session, then fix this section to match what you see and delete this comment. -->

- `/memory` lists `./CLAUDE.md` as loaded.
- `/permissions` shows 2 allow rules, 1 ask rule and 3 deny rules.
- Asking "How do I run the tests here?" gets the answer `npm test` from CLAUDE.md, without me explaining.
