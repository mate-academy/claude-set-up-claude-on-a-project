# Notes: setting up Claude Code on this project

## What's in CLAUDE.md, and what I left out

I kept four parts: a one-line description, the three commands I actually run (dev, test, lint), the conventions, and a short architecture map. The conventions cover the choices Claude would otherwise guess at or get wrong: CommonJS instead of ES modules, `node:test` instead of Jest, all data access going through `db/store.js`, and the JSON error shape and status codes. Each one is written as a "do X, not Y" rule, so Claude can follow it without asking. The architecture section says where new code goes, for example "a new resource = a new route file + one `app.use` line".

I left out the per-endpoint API docs (Claude can read `routes/` directly), the setup steps from the README, and the sample users. I also left out anything from `.env`, because secrets never belong in a committed file. Each line costs context on every session, so if Claude could learn something from the code in one glance, I didn't include it.

## Permission rules

- **allow**: `npm test` and `npm run lint`. They're safe, read-only checks I want Claude to run often without asking me.
- **ask**: `git push` and `npm install`. Both are fine but change things outside my working tree (the remote, dependencies), so I want to confirm each time.
- **deny**: reading or editing `.env`, `cat .env*`, force-push, and `rm -rf`.

Without the `.env` deny rule, Claude could read real secrets (a database URL, API keys) into the conversation. From there they could end up in a log, a commit, or a pasted snippet. This matters even more here, because the repo's `.gitignore` has leading spaces on its lines, so `.env` and `.claude/settings.local.json` are **not** actually ignored. You can check this with `git check-ignore -v .env`. Without the force-push deny rule, one mistaken command could overwrite shared history on the remote.

## Verification

- `claude --version` → 2.1.280 (Claude Code)
- `/memory` in a fresh session lists `./CLAUDE.md` as loaded.
- `/permissions` shows the allow / ask / deny rules above.
- Asking "How do I run the tests here?" gets `npm test` with `node:test` + supertest, answered from CLAUDE.md.
