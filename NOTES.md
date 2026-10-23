# Notes

## What's in CLAUDE.md and what I left out

I started from a `/init`-style draft and cut it down to four parts: a one-line description, the commands (dev, test, a single test file, lint, plus the fact that CI runs lint and then tests), five conventions, and a short architecture note. Each convention is a rule I took from the existing code that Claude could easily break without being told: CommonJS instead of ES modules, all data access through `db/store.js`, converting route ids with `Number()`, the `{ error }` response format with 400/404/201, and testing against the exported `app` with supertest.

I left out:
- a list of every endpoint and file, because Claude can read `routes/` in seconds;
- generic advice like "write clean code" or "add tests", because it doesn't change what Claude does;
- the course instructions from the README, because they're about the assignment, not about working on the code;
- anything from `.env`, because it's secret.

## Permission rules

- **Allow:** `npm test`, `node --test <file>`, `npm run lint`, and the read-only git commands `status`, `diff` and `log`. These are safe, run all the time, and only read or report, so prompting for them every time would be noise.
- **Ask:** `git push` and `npm install`. A push is visible to others and hard to take back, and installing packages changes `package-lock.json` and runs third-party install scripts, so I want to confirm both each time.
- **Deny:**
  - reading, editing or `cat`-ing `.env`;
  - force-pushing (`--force` and `-f`);
  - `git reset --hard`;
  - `rm -rf`.

Without the `.env` deny rule, Claude could read real secrets into the conversation context, for example while "checking config", and then repeat them in output or in a commit. That risk is higher in this repo because the `.gitignore` lines after `node_modules/` start with spaces, and Git treats leading spaces as part of the pattern. I checked with `git check-ignore`: `.env` and `.claude/settings.local.json` are not ignored, so a real `.env` could be committed by accident. I fixed this in a separate commit by removing the leading spaces (not app code), and `git check-ignore` now matches both files. The deny rule still matters: an ignored `.env` can still be read into the conversation. Without the force-push and `reset --hard` rules, a single mistaken command could destroy commits on the remote or uncommitted local work.

## Verification

- `claude --version` → `2.1.309 (Claude Code)`.
- `.claude/settings.json` parses as valid JSON with 8 allow, 2 ask and 7 deny rules.
- A fresh, non-interactive session (`claude -p "How do I run the tests here...?"`) answered `npm test` and `node --test tests/users.test.js` and said it took them from the Commands section of `CLAUDE.md`, so the file is loaded.
- That run warned that allow rules are ignored until the folder is trusted, so I opened `claude` here interactively and accepted the trust dialog.
- In that interactive session, `/memory` lists `./CLAUDE.md` as project memory, and `/permissions` shows the allow, ask and deny rules above.
