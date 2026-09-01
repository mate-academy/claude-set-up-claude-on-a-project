# NOTES.md

## CLAUDE.md choices

I kept `CLAUDE.md` to four lean sections: a one-line description, **Commands** (`npm run dev`, `npm test`, `npm run lint`), **Conventions** (the relaxed `no-unused-vars` rule for Express handler params, and the "export `app` without calling `.listen()`" pattern for tests), and **Architecture** (the role of `server.js`, `routes/`, and `db/store.js`).

I left out anything Claude can already derive by reading the code — full route lists, dependency versions, file-by-file walkthroughs — since that just goes stale and adds no value over `git grep`. I also left out one-off task notes (this course exercise itself isn't in there) and anything sensitive, like `.env` contents or real config values. The goal was a file that saves Claude a first read-through, not a copy of the codebase.

## Permission rules

In `.claude/settings.json` I added:

- **allow**: `Bash(npm test:*)` and `Bash(npm run lint:*)` — both are safe, frequently-run commands with no side effects, so Claude doesn't have to ask every time.
- **ask**: `Bash(git push:*)` — pushing affects the shared remote, so I want a confirmation prompt each time rather than a blanket allow or deny.
- **deny**: `Read(./.env)` and `Bash(git push --force:*)` — without the `Read(./.env)` deny, Claude could read real secrets (API keys, credentials) into context and potentially leak them into a response, a commit, or a shared session. Without the force-push deny, Claude could overwrite remote history on a shared branch, destroying other people's commits with no easy recovery.

## Verification

Confirmed `/memory` shows `CLAUDE.md` as loaded and `/permissions` lists the allow/ask/deny rules above. Asking "How do I run the tests here?" was answered correctly from `CLAUDE.md` (`npm test`, Node's built-in `node:test` + `supertest`) without further explanation.
