# NOTES

## What's in my CLAUDE.md, what I left out, and why

**What I put in:** I described the project in one line: an Express REST API for users. I listed the commands Claude needs most, which are `npm run dev`, `npm test`, running a single test file or a single test by name, and `npm run lint`. I also noted that CI runs lint and then tests, so both must pass. Then I added the project rules Claude can't easily guess:
- use CommonJS, not ESM
- write tests with `node:test` and `supertest` against the exported `app`, without starting a real server
- read and write data only through `db/store.js`
- send errors as `{ error }` and return early when validation fails

Last, I wrote a short architecture note. It explains how `server.js` mounts the routers and only calls `listen()` when it is run directly, and how to add a new resource. It also warns that the in-memory store is shared by every test in a run, so a test that creates users changes what later tests see.

**What I left out:**
- **Secrets and `.env` values.** CLAUDE.md is committed to git, so anything in it is public. It only says that `.env` must not be read or committed.
- **The README's setup steps.** Cloning the repo, opening a terminal and installing Claude Code are steps for people, and they're only needed once.
- **Long pasted documents and file-by-file listings.** Claude can read the code itself.
- **Style rules that ESLint already enforces.**
- **One-off tasks.**

Everything in the file loads into every session, so each line should be something that changes how Claude works here.

## Which permission rules I added, and what could go wrong without the deny rules

I put these rules in `.claude/settings.json`. Each one is written twice, once for Bash and once for PowerShell, because Claude can run commands in either shell on Windows.

- **Allow:** `npm run dev`, `npm run lint`, `npm test`, `node --test …`, `git status` and `git diff …`. These are safe, read-only or local commands I run all the time, so being asked each time would only slow things down.
- **Ask:** `git push …`. Pushing changes the shared remote, so I want to confirm it every time.
- **Deny:** reading `./.env`, `rm -rf …` and `Remove-Item -Recurse …`.

Without the `.env` deny rule, Claude could read real secrets, such as database passwords or API keys. Those would then be sent to the model, and they could end up in a reply, a log, a commit or a PR. Without the delete rules, a mistaken cleanup command could wipe out the project, or files outside it, and that can't be undone.

One limit to note: `Read(./.env)` blocks the Read tool, but it doesn't stop a shell command like `cat .env` on its own. Real secrets should still stay out of the repo.

## Verification

- `/memory` shows `CLAUDE.md` as loaded.
- `/permissions` lists the allow, ask and deny rules above.
