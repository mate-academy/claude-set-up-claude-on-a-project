# Notes

## CLAUDE.md: what's in it and what's left out

**What's in it**
- **Description:** one line saying what the API is, plus a reminder that app code shouldn't change
  unless someone asks.
- **Commands:** `dev`, `test`, `lint`, and how to run a single test file. It also notes that CI
  requires both lint and tests to pass.
- **Conventions:** rules taken from the existing code, written so Claude can follow them without
  asking:
  - Use CommonJS, not ES modules.
  - All data access goes through `db/store.js`.
  - Errors are `{ error }` JSON with status 400 or 404. Successful creates return 201.
  - Tests use `node:test` with supertest.
  - Never touch `.env`.
- **Architecture:** things you can't see from a single file:
  - `server.js` only calls `listen()` when run directly, so tests can import `app`.
  - There's one router per resource.
  - The store is in-memory and resets on restart.
  - There's a set pattern for adding a new resource.

**What's left out, and why**
- **File-by-file listings and route details.** Claude can read these from the code, and a copy in
  `CLAUDE.md` goes stale.
- **Generic advice** ("write clean code", "add tests"). It doesn't change what Claude does and
  costs context in every session.
- **Secrets or real config values.** `CLAUDE.md` is committed and loaded into every prompt.
- **Personal preferences.** These go in `~/.claude/CLAUDE.md` or `CLAUDE.local.md`, not in the
  shared file.
- **`npm install` / `npm start`, and the `.gitignore` details.** These are obvious from
  `package.json` and don't change how Claude works.

## Verification

In a fresh session started in the project folder:
- `/memory` shows the project `CLAUDE.md` as loaded.
- `/permissions` lists the allow, ask and deny rules below.
- Asking "How do I run the tests here?" gets `npm test` / `node --test <file>` straight from
  `CLAUDE.md`.

## Permission rules (`.claude/settings.json`)

| Rule | Type | Why |
|---|---|---|
| `Bash(npm test:*)` | allow | Running tests is safe and frequent, so there's no prompt every time. |
| `Bash(git push:*)` | ask | A push goes outside the machine, so a human confirms each one. |
| `Read(./.env)` | deny | Keeps real secrets out of Claude's context. |
| `Bash(git push --force:*)` | deny | Force-pushing can overwrite other people's history and can't be undone. |

**What could go wrong without the deny rules**
- **Without `Read(./.env)`:** Claude could open `.env` while debugging config. Secrets like
  `DATABASE_URL` would then go to the model and could show up in the transcript, logs, commit
  messages or pasted output. `.env.example` already shows the config's structure, so Claude
  never needs the real file.
- **Without the force-push deny:** force-pushing is covered by the broader `git push:*` ask rule.
  A single approval, or a quick "yes" out of habit, could then rewrite `main` on the remote and
  wipe out teammates' commits. Deny rules take priority over ask and allow rules, so it's
  blocked even if someone later adds a broad allow rule.

**Limits:** `Read(./.env)` blocks Claude's Read tool, not shell commands like `cat .env`. It
lowers the risk but doesn't guarantee Claude never sees the file.

## Fixed: `.env` wasn't actually git-ignored

The lines in `.gitignore` started with spaces (`   .env`), and Git treats leading spaces as part
of the pattern. `git check-ignore .env` matched nothing, so a real `.env` could have been
committed. The same was true for `.claude/settings.local.json`. I removed the spaces, and
`git check-ignore` now matches both files.
