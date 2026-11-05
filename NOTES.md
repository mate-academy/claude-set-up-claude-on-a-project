# Notes: setting up Claude Code on this project

## What's in my CLAUDE.md, and what I left out

I generated a first draft with `/init`, then cut it down to four short parts:

- **Description:** one line saying what the project is.
- **Commands:** dev, test and lint, plus how to run a single test file (`node --test tests/users.test.js`). That last one isn't obvious from `package.json`. I also noted that CI runs lint and then tests, so Claude knows both have to pass.
- **Conventions:** rules Claude could get wrong without being told: use CommonJS `require` (not `import`), write tests with `node:test` + `supertest` (not Jest), return errors as `{ error: "..." }`, and never read `.env`.
- **Architecture:** `server.js` exports `app` without starting the server (that's how the tests work), there's one route file per resource, and all data goes through `db/store.js`, which is in-memory and resets on restart.

**Left out on purpose:** a file-by-file list (Claude can read the folders itself), general advice like "write clean code", setup steps already in the README, and anything secret. I kept it short because every line is loaded into every session, and a shorter file is easier for Claude to follow.

## Permission rules

- **Allow:** `npm test`, `npm run lint` and `node --test`. They're safe, read-only checks I run all the time, so Claude can run them without asking.
- **Ask:** `git push`. Pushing publishes my work to GitHub, so I want to confirm each one.
- **Deny:** reading `.env`, and `git push --force` / `git push -f`.

**Without the deny rules:** Claude could read `.env` and leak real secrets (passwords, API keys) into the chat or into a file it writes. A force-push could overwrite the branch on GitHub and permanently erase other people's commits.

## Verifying it works

- In a new session I asked "How do I run the tests here?" and Claude answered with `node --test tests/users.test.js`. That command only appears in my `CLAUDE.md`, so the file is loaded.
- `/memory` shows `CLAUDE.md` loaded as project memory, and `/permissions` lists my allow, ask and deny rules.

## Something I found along the way

The starter `.gitignore` had spaces at the start of most lines, so git was **not** ignoring `.env` or `.claude/settings.local.json` (I checked with `git check-ignore`). I removed the spaces so secrets and personal settings can't be committed by accident.
