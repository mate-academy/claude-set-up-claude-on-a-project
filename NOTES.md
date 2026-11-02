# Notes: setting up Claude Code on this project

## What's in CLAUDE.md, and what I left out

It has a one-line description, the four commands (with the fact that CI runs lint and then tests), five "do X, not Y" conventions, and a short architecture map. The conventions are the part that saves the most time: CommonJS rather than ESM, data access only through `db/store.js`, the `{ error }` response shape, `node:test` + `supertest` rather than Jest, and no new dependencies without asking. Without them, Claude could "modernise" the code and break the build.

I left out explanations of the endpoints (Claude can read the routes, and a copy would go stale), the course setup steps (one-off tasks, not standing rules), and any config values or secrets.

## Permission rules

I allow `npm test`, `npm run lint` and read-only git commands, because they're safe and I run them constantly. `git push` and `npm install` ask first: one is visible to others, and the other changes the lockfile and downloads code. I deny reading or editing `.env`, `git push --force` / `-f` and `git reset --hard`.

Without the deny rules, Claude could open `.env` while looking at config and pull secrets into the conversation or a commit. A force-push or a hard reset could wipe out work that can't be recovered. The rules match prefixes, so they're a safety net, not a guarantee. For example, `git push origin main --force` slips past the deny rule, but it still hits the `git push` ask rule.

## Verification

- `/memory` shows CLAUDE.md loaded: _(confirm)_
- `/permissions` lists the allow / ask / deny rules: _(confirm)_
