# NOTES.md

## CLAUDE.md

I kept it to four lean sections: a one-line project description, commands (`npm run dev`, `npm test`, `npm run lint`, plus how to run a single test file), architecture (`server.js` entry point, one router per resource in `routes/`, all data access through `db/store.js`), and two conventions (error responses shaped as `{ error: "..." }` with proper status codes, and routes never touching the in-memory arrays directly).

I left out: a file-by-file component listing (Claude can discover that by reading), anything about `.env`/secrets beyond "don't commit them" (already covered by `.gitignore` and `.env.example`), and generic advice like "write tests" or "handle errors" — none of that is specific to this repo, so it wouldn't save Claude any time.

## Permission rules (`.claude/settings.json`)

- **Allow**: `Bash(npm test:*)`, `Bash(npm run lint:*)` — the two commands I run constantly while iterating; no reason to be prompted for either.
- **Ask**: `Bash(git push:*)` — pushing affects the shared remote, so I want a chance to glance at it first, but it's common enough that a hard deny would be annoying.
- **Deny**: `Read(./.env)`, `Bash(git push --force:*)`, `Bash(rm -rf *)`.

Without the deny rules: Claude could read `.env` into context and potentially leak real secrets into a commit message, a log, or a shared conversation. `git push --force` could silently overwrite a teammate's commits on a shared branch with no way to undo it from my side. `rm -rf` is a blanket guard against an unintended recursive delete — the in-memory store means there's no database to lose, but the git history and working tree are still worth protecting.

## Verification

To confirm: start a fresh session in this project folder, run `/memory` and check `CLAUDE.md` is listed as loaded, then run `/permissions` and check the allow/ask/deny rules above appear.
