# Notes: setting up Claude Code on this project

## What's in CLAUDE.md

- **Description** — one line: a small Express REST API backed by an in-memory store.
- **Commands** — `npm run dev`, `npm test`, `npm run lint`, plus how to run a single test file or a single test by name (`node --test <file> --test-name-pattern=...`). Also noted that CI runs lint and then tests, so both have to pass.
- **Architecture** — `server.js` mounts one router per resource from `routes/` and exports `app`, and only calls `listen()` when run directly, which is why tests can import it. All data goes through `db/store.js`, an in-memory store that resets on restart and is shared by every test in one run.
- **Conventions** — concrete rules Claude can follow without asking: CommonJS (`require`), not ES modules; errors returned as `{ error: "..." }` with 400 for bad input and 404 for unknown ids; convert `:id` params with `Number()`; tests use `node:test` + `supertest`, not Jest; never read or commit `.env`.

## What I left out, and why

- **A file-by-file listing** — Claude can see the files itself, so a listing only adds length and goes stale.
- **Generic advice** ("write good tests", "handle errors") — it doesn't change behaviour and dilutes the rules that matter.
- **The course instructions and submission steps from README.md** — these are one-off tasks, not facts about how the code works.
- **Secrets or real config values** — `CLAUDE.md` is committed. It only points to `.env.example`.

## Permission rules (`.claude/settings.json`)

| Type  | Rule                       | Why |
|-------|----------------------------|-----|
| allow | `Bash(npm test:*)`         | Tests are safe and run constantly, so Claude shouldn't prompt for them. |
| ask   | `Bash(git push:*)`         | Pushing is outward-facing, so I want to confirm each one. |
| deny  | `Read(./.env)`             | `.env` holds real secrets, and Claude never needs them to work on the code. |
| deny  | `Bash(git push --force:*)` | A force-push can overwrite shared history and can't easily be undone. |

**Without the deny rules:** Claude could read `.env` while exploring and put secrets into its context, its output or a commit. It could also force-push over the remote branch and wipe out other people's work. This project's `.gitignore` makes the risk real: its lines are indented with spaces, so `.env` isn't actually ignored right now.

## Verification

- `/memory` — showed CLAUDE.md loaded
- `/permissions` — showed the rules
