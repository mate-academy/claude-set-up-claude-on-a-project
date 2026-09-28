# Notes

## What I put in CLAUDE.md

I kept it to the four parts the project needs:

- **Description** — one line: an Express REST API for users plus a health check, backed by an in-memory store.
- **Commands** — `npm run dev`, `npm test` (plus how to run a single test file), and `npm run lint`, with a note that CI runs lint then tests, so both must pass.
- **Conventions** — rules Claude can follow without asking: CommonJS only, the `{ error: "message" }` shape with 400/404/201 status codes, a `// METHOD /path — what it does` comment above each route, and tests written with `node:test` + `node:assert` + `supertest` rather than Jest or Mocha.
- **Architecture** — `server.js` mounts one router per resource and exports `app` (with the `listen()` guard that tests depend on), `routes/` has one file per resource, `db/store.js` is the only data-access layer, and tests share one store so they shouldn't assume fixed IDs or counts.

## What I deliberately left out

- **Anything Claude can read from the code**, such as a file-by-file listing, the full route list, or the dependency versions in `package.json`. It would only repeat the code and go stale.
- **Secrets and config values.** Nothing from `.env` or `.env.example` goes in, because CLAUDE.md is committed and loaded into every session.
- **One-off tasks and long documents.** I didn't paste in the README or the assignment steps, since they don't help with day-to-day work on the code.
- **Generic advice** like "write clean code." It takes up space without changing what Claude does.

## Permission rules (`.claude/settings.json`)

- **allow:** `Bash(npm test:*)`, `Bash(npm run lint:*)`. These are safe, read-only checks I run all the time, so they shouldn't need a prompt.
- **ask:** `Bash(git push:*)`. A normal push is fine, but it publishes my work, so I want to confirm each one.
- **deny:** `Read(./.env)`, `Bash(git push --force:*)`, `Bash(git push -f:*)`.

### Why reading `.env` is denied

`.env` is where real secrets like API keys and database passwords would go. It's git-ignored for that reason. If Claude read it, those values would end up in the conversation context and could be echoed into output, logs, or a commit. Claude doesn't need them anyway, because `.env.example` shows the shape of the config.

### Why `git push --force` is denied

A force-push rewrites the remote branch's history and can permanently delete commits, including other people's. It can't easily be undone, so I blocked it completely (both `--force` and `-f`) instead of just asking. If I ever really need one, I'll run it myself.

## Verification

- I ran `/memory` and confirmed the project `CLAUDE.md` is listed and loaded.
- I ran `/permissions` and confirmed my allow, ask, and deny rules show up as configured.
