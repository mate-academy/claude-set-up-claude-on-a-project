# Notes

## CLAUDE.md: what's in it and what's left out

**In it:**

- A one-line description of the project.
- The commands I actually run: `dev`, `test`, `lint`, plus how to run a single test file or test name. Claude would otherwise guess at Jest-style flags.
- Conventions that aren't obvious from a quick glance and that Claude would likely get wrong:
  - CommonJS, not ES modules
  - `node:test` + `supertest`, not Jest
  - data access only through `db/store.js`
  - errors returned as `{ error }` JSON
  - explicit param parsing, because IDs are compared with `===`
  - `.env` stays out of reads and commits
- A short architecture note covering two things:
  - `server.js` only calls `listen()` when run directly, so tests can import `app`.
  - The in-memory store keeps its data across tests in one run. That's the trap most likely to cause flaky tests.

**Left out:**

- A file-by-file listing. Claude can discover that in seconds.
- Generic advice like "write tests" or "handle errors".
- Course and setup instructions from the README. They're one-off tasks, not project guidance.
- Anything secret. The file only points at `.env.example`.

I also cut the boilerplate header and a few extra words from the generated draft. Every line should change how Claude behaves.

## Permission rules

- **allow:** `npm test`, `npm run lint`, `node --test`, and read-only git commands (`status`, `diff`, `log`). These are safe and frequent, so prompting for them every time is just noise.
- **ask:** `git push` and `npm install`. Both are legitimate, but one publishes work and the other changes dependencies, so I want to confirm each time.
- **deny:**
  - reading or editing `.env` (including `cat .env`)
  - `git push --force` / `-f`
  - `git reset --hard`
  - `rm -rf`

**Without the deny rules:** Claude could read `.env` while debugging config. Real secrets such as `DATABASE_URL` would then end up in the conversation and possibly in a commit or log. A force-push or hard reset could silently destroy my own or a teammate's work, and neither is easy to undo.

`.claude/settings.local.json` stays git-ignored for personal overrides.

## Verification

- `/memory`: TODO, confirm `CLAUDE.md` shows as loaded.
- `/permissions`: TODO, confirm the allow, ask and deny rules above are listed.
- I asked "How do I run the tests here?": TODO, note whether the answer came from `CLAUDE.md`.
