# Notes

## What's in CLAUDE.md

I started from a `/init` draft and shaped it into four parts:

- **Description:** one line saying this is a small Express users + health API with an in-memory store.
- **Commands:** `npm run dev`, `npm test`, running one test file or tests matching a name pattern, `npm run lint`, and `npm run lint && npm test` as the same checks CI runs. I also added a warning not to run `npm run dev` in the foreground: it uses `node --watch` and never exits, so it would block Claude's shell.
- **Conventions:** rules Claude can follow without asking. CommonJS, not ES modules. Tests use `node:test` + `supertest` against the exported `app`, with no Jest or Mocha. Routes get data only through `db/store.js`. Errors use the `{ error: "..." }` shape with 400/404, and a create returns 201. Double quotes and semicolons. A one-line comment above each route. I wrote down these rules because ESLint doesn't enforce most of them, so Claude can't pick them up from lint errors.
- **Architecture:** `server.js` only calls `listen()` when run directly, which is why tests can import the app. There is one router per resource in `routes/`. The store is shared in memory, so tests should assert with `>=` rather than exact counts. There is no central error handler or validation library. Config comes from env vars, and `.env` is not loaded automatically.

## What I deliberately left out, and why

- **The course and setup instructions from the README** (installing Claude, opening a terminal, the submission steps). These are one-off tasks for me, not things Claude needs every session. Every line in CLAUDE.md is loaded into context each time, so one-off material only adds noise.
- **A file-by-file listing and route details** (which fields a user has, which endpoints exist). Claude can read these from the code in seconds, and a copy in CLAUDE.md would go out of date as soon as the code changes.
- **Secrets and `.env` values.** Nothing sensitive goes in a committed file. I only mention that `.env.example` documents the variables.
- **Dependency versions and `npm start`.** `package.json` already records them, and `npm run dev` / `npm test` cover the day-to-day work.
- **Generic advice** ("write clean code", "add tests"). It isn't specific enough to change what Claude does, so it isn't worth the space.

## Permission rules I added (`.claude/settings.json`)

- **Allow:** `npm test` and `npm run lint`. They're read-only checks that I run constantly (they're also what CI runs), so approving them every time would just slow me down.
- **Ask:** `git push` and `npm install`. Both are fine to do but have effects outside the working tree: a push publishes my work to the remote, and an install downloads and runs third-party package code. I want to see each one before it happens.
- **Deny:** reading `./.env`, `git push --force` / `git push -f`, and `rm -rf`. Each of these is either sensitive or hard to undo.

## What could go wrong without the deny rules

- **`Read(./.env)`:** that file is where real secrets would live (for example `DATABASE_URL` with a password). Without the rule, Claude could read it while exploring the project. The secrets would then sit in the conversation and could end up in a commit, a log or a pasted snippet.
- **Force push:** it rewrites the remote branch's history and can permanently wipe out commits that other people (or I) pushed. A normal push is only "ask", but there's no situation where I want Claude doing a force push.
- **`rm -rf`:** one wrong path could delete the project or files outside it, and nothing undoes it. Even uncommitted work in the repo would be gone.

## Permission rules I deliberately left out, and why

- **No allow for `npm run dev`.** It never exits (`node --watch`), and CLAUDE.md already tells Claude to test through `npm test` instead.
- **No allow for `git commit`, `git add` or other git writes.** I want to review what goes into each commit while I'm learning.
- **No blanket rules like `Bash(*)` or `Bash(git:*)`.** These would quietly let through things the narrow rules are meant to catch.
- **No personal preferences in this file.** Those go in `.claude/settings.local.json`, which stays on my machine, because the shared file is for rules that make sense for everyone on the project.

Known limits I accepted: the deny rules match command prefixes, so they aren't airtight. `Read(./.env)` doesn't stop `cat .env` through Bash. `git push origin main --force` (with the flag at the end) or `--force-with-lease` doesn't match the force-push pattern. The rules are a safety net against mistakes, not a security boundary.

## Verification

In a fresh session, `/memory` showed `./CLAUDE.md` as loaded, and `/permissions` listed the allow / ask / deny rules above.
