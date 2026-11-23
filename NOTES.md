# Notes

## What's in CLAUDE.md and why

I kept the four required parts and only included what Claude can't easily infer, or would likely get wrong:

- **Commands**: all three scripts. I noted that `npm run dev` is long-running so Claude checks changes with tests instead, and that CI runs lint and then tests.
- **Conventions**: rules that are easy to break without noticing. CommonJS instead of ESM, data access only through `db/store.js`, the `{ error }` response shape, and `node:test` + `supertest` instead of adding a new test framework. Each one is a "use X, not Y" rule, so Claude can follow it without asking.
- **Architecture**: how a request reaches the data. Entry point, one router per resource, the store. I also mentioned that the store is in-memory and shared within a test file, because that affects how tests should be written.

**Left out on purpose:** an endpoint list, file-by-file descriptions, and install/setup steps. Those are easy to read from the code or the README, and they go stale. I also left out secret values and anything from `.env`, plus course-task notes like "this is project 1", since they're one-off context and not project rules.

## Permission rules

- **Allow**: `npm test`, `npm run lint`, and read-only git (`status`, `diff`, `log`). These are safe, run all the time, and approving them every time adds no value.
- **Ask**: `git push` (it leaves my machine, so I want to see it each time) and `npm install` (it changes dependencies and the lockfile).
- **Deny**: reading or editing `.env` (and the obvious `cat .env`), force-push, `git reset --hard`, and `rm -rf`.

**Without the deny rules:** Claude could read `.env` while "checking config", and real secrets like `DATABASE_URL` would end up in the conversation and could be pasted into code, logs, or a commit. A force-push or hard reset could wipe out commits that can't easily be recovered. Note that `Read(./.env)` only blocks the Read tool. Other shell commands (`grep`, `head`, …) could still reach the file, so the deny list reduces the risk but isn't a sandbox.

## Fix to .gitignore

Every line after the first in `.gitignore` started with spaces. Git treats those spaces as part of the pattern, so `.env` and `.claude/settings.local.json` were **not** actually ignored (`git check-ignore` matched only `node_modules/`). I removed the leading whitespace. Now both are ignored, which backs up the `.env` deny rule.

## Verification

- `npm test` (4/4 pass) and `npm run lint` (clean) both run.
- In a fresh `claude` session: `/memory` lists `./CLAUDE.md` as loaded, and `/permissions` shows the allow/ask/deny rules from `.claude/settings.json`.
- Asking "How do I run the tests here?" gets `npm test` back, taken from CLAUDE.md.
