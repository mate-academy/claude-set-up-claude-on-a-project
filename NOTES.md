# Notes: Setting Up Claude Code on This Project

## 1. What went into CLAUDE.md

CLAUDE.md covers only what Claude can't quickly work out by reading the code:

- **Commands:** run the dev server, all tests, a single test, and lint, plus what CI checks.
- **Conventions:** CommonJS only, routes go through `db/store.js`, the JSON error format, testing with `node:test` + `supertest`, and comments on route handlers.
- **Architecture:** how `server.js` exports `app` for tests, one router file per resource, and the fact that the in-memory store is shared by every test in a run.

It leaves out file-by-file listings, generic coding advice, and anything already obvious from the code. Claude loads this file into every session, so extra text costs context without helping. It contains no secrets: it points to `.env.example` and notes that `.env` is git-ignored, but never includes real values. CLAUDE.md is committed to the repo, so anything in it would be public.

## 2. Permission rules (`.claude/settings.json`)

- **Allow `npm test` and `npm run lint`:** both are safe and read-only, and Claude runs them often to check its work. Asking every time would only slow things down.
- **Ask before `git push`:** pushing publishes code to a shared remote and is hard to undo, so a person should approve each push.
- **Deny reading `.env`:** it holds real configuration and possibly secrets. Claude doesn't need them to work on the code, and anything it reads could show up in its output or in logs.
- **Deny force-pushing (`--force`, `-f`, `--force-with-lease`):** a force push can overwrite other people's commits on the remote. Deny rules take priority over ask and allow rules, so this is blocked outright and never reaches an approval prompt.

## 3. What could go wrong without the deny rules

- Claude could read `.env` and repeat secrets such as API keys or database credentials in its replies, commits, or logs, where they could leak.
- An approval prompt for a force push could be accepted by mistake, rewriting shared history and deleting teammates' work on `main` or another shared branch.
- Approval prompts depend on a person reading carefully every time. Deny rules are a hard limit that still holds when someone is tired or in a hurry.

## 4. Verification

- **CLAUDE.md:** checked with `/memory`, which confirmed Claude loads the file as project memory.
- **Permissions:** checked with `/permissions`, which confirmed the allow, ask, and deny rules from `.claude/settings.json` are active.

No application code was changed during this setup.
