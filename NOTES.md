# Notes

## What went into CLAUDE.md, and what didn't

I kept four short sections: a one-line description, the three commands (plus the fact that CI runs lint and tests, so neither can be skipped), five conventions, and a four-line architecture map. Every convention comes from something I saw in the code and that Claude would plausibly get wrong on its own: CommonJS instead of ES modules, `node:test` + `supertest` instead of Jest, data access only through `db/store.js`, the `{ error }` response shape with the right status codes, and keeping config in `.env.example` rather than `.env`.

I deliberately left out anything Claude can read straight from the code in seconds (the full endpoint list, the seed users, dependency versions), one-off notes from setup (npm update notices), and anything sensitive: there are no secrets, URLs, or `.env` values in the file. Each extra line costs context in every session, so a line only stayed if it would prevent a wrong guess.

## Permission rules

- **Allow:** `npm test`, `npm run lint`, `git status`, `git diff`. They are read-only or check-only, run constantly, and approving them every time adds nothing.
- **Ask:** `git push`. It publishes work to GitHub, so a human should confirm each one.
- **Deny:** reading or editing `.env`, `git push --force` / `git push -f`, and `git reset --hard`.

Without the deny rules, Claude could read `.env` while "looking around" and pull real secrets into its context, where they may end up in a log, a commit message, or a pasted snippet. A force push could overwrite commits on the remote branch, and `git reset --hard` silently throws away uncommitted work. Deny also wins over ask, so the broad `git push` ask rule can't let a force push through. One limit: `Read(./.env)` blocks Claude's Read tool, not every shell command, so the rule is a strong guardrail rather than a guarantee.

The deny rule on `.env` matters more than it looks here. The repo's `.gitignore` indents `.env` and `.claude/settings.local.json` with leading spaces, and git treats those spaces as part of the pattern, so `git check-ignore` confirms neither file is actually ignored. I didn't change `.gitignore` in this PR because the task scope is Claude setup, but it should be fixed.

## Verification

- A fresh `claude -p` session in the repo answered "How do I run the tests here?" with `npm test` and the `node:test` + `supertest` stack, and named `CLAUDE.md` as its source, without any explanation from me.
- In a fresh interactive session, `/memory` listed the project `CLAUDE.md` as loaded, and `/permissions` showed the allow, ask, and deny rules above.
