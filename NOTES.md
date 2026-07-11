# NOTES.md

## CLAUDE.md

I kept it to the four required parts: a one-line description, the three `npm` scripts (`dev`, `test`, `lint`), four conventions, and a short architecture note.

The conventions I picked are things Claude couldn't reliably infer from a quick read but would get wrong without being told explicitly: that the project is CommonJS (not ESM), that routes are one-file-per-resource mounted in `server.js`, that all data access must go through `db/store.js` instead of touching the in-memory array directly, and that the `require.main === module` guard in `server.js` must stay so tests can import `app` without opening a real port.

I deliberately left out:
- File-by-file descriptions of `routes/users.js` and `routes/health.js` — obvious from opening the files.
- Anything about `.env` contents or the `PORT` variable — no real secrets exist here, and it's a one-off config detail, not a durable rule.
- Course/assignment context (units, submission steps, definition of done) — that's about the exercise, not the codebase, and would go stale immediately.
- A testing framework explanation — `npm test` already documents the "how"; the "why" isn't non-obvious.

## .claude/settings.json

- **allow**: `Bash(npm test:*)` — it's the command I'll run most often while iterating, and it's read-only/side-effect-free, so there's no reason to be asked every time.
- **ask**: `Bash(git push:*)` — pushing affects a shared remote, so I want a chance to review before it happens, but it's common enough that an outright deny would be annoying.
- **deny**: `Read(./.env)` and `Bash(git push --force:*)`.
  - Without the `Read(./.env)` deny, Claude could read real secrets (API keys, DB credentials) straight off disk and potentially echo them into a response, a commit, or a shared log — there's no legitimate reason for it to need that file's contents to do its job.
  - Without the `git push --force:*` deny, an agent that got confused about branch state could silently overwrite other people's commits on the remote, which is very hard to undo cleanly (especially on a shared branch).
