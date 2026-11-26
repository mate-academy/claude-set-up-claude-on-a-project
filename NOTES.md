# NOTES

## CLAUDE.md — what's in, what's out

**In:** a one-line description, the three commands I actually run (`dev`, `test`, `lint`, plus the fact that CI runs lint then tests), five conventions taken from the existing code, and a short architecture map. Every convention is something Claude could get wrong without being told: using ESM instead of CommonJS (ESLint is set to `sourceType: "script"`), reading the `users` array directly from a route instead of going through `db/store.js`, inventing a new error format, or reaching for Jest instead of `node:test` + `supertest`.

**Out, on purpose:** generic Express explanations and a list of every endpoint (Claude can read `routes/` in seconds, and a copy in CLAUDE.md would go stale), the contents of `.env` or any config values (sensitive, and not needed), and one-off tasks like "set up this course project" (they would be useless noise in every future session). I kept it short so each line carries weight.

## Permission rules

- **allow:** `npm test`, `npm run lint`, `npm run dev` — safe, read-only-ish, run constantly; no reason to approve them every time.
- **ask:** `git push` (publishes my work, so I want to see it first) and `npm install` (changes dependencies and the lockfile).
- **deny:** reading/editing `.env` and `cat .env`, `git push --force` / `-f`, and `rm -rf`.

Without the `.env` deny rule, Claude could read real secrets (database URLs, API keys) while "exploring the project" and they would end up in the conversation context — and potentially in logs or pasted output. Without the force-push deny, one mistaken command could overwrite the shared branch history on the remote and lose other people's commits.

## Something I found and fixed

The provided `.gitignore` had leading spaces on the `.env` and `.claude/settings.local.json` lines. Git treats leading spaces as part of the pattern, so **neither file was actually ignored**. I removed the spaces and confirmed with `git check-ignore` that both are now ignored, while `.claude/settings.json` is still committed.

## Verification

- `/memory` in a fresh session: the project `CLAUDE.md` shows as loaded.
- `/permissions`: the allow / ask / deny rules from `.claude/settings.json` are listed.
- Asked "How do I run the tests here?": Claude answered `npm test` from `CLAUDE.md` without extra explanation.
