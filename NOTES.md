# NOTES.md

## CLAUDE.md

I kept it to four things: a one-line description, the three commands I run most (`npm run dev`, `npm test`, `npm run lint`), two conventions (route files live in `routes/` and are mounted in `server.js`; routes never touch data directly, only `db/store.js`), and the `require.main === module` guard in `server.js` that lets tests import `app` without binding a real port.

I left out: a file-by-file directory listing (Claude can read the tree itself), the note that the in-memory store resets on restart (already commented in `db/store.js`), and anything about `.env`/secrets, since this starter doesn't use any real config yet. Anything Claude can discover in one file read didn't earn a line in CLAUDE.md — the goal was rules Claude couldn't infer on its own, not a restatement of the code.

## .claude/settings.json

- **Allow**: `Bash(npm test:*)` — the test command is safe and I run it constantly, so it shouldn't need a confirmation each time.
- **Ask**: `Bash(git push:*)` — pushing affects the shared remote, so I want a chance to glance at what's going out before it does.
- **Deny**: `Read(./.env)` and `Bash(git push --force:*)`.

Without the `Read(./.env)` deny rule, Claude could read real secrets straight into the conversation the moment a `.env` file exists (e.g. a database URL or API key), and that content could end up quoted back in a response or a commit message. Without the force-push deny rule, an agent working autonomously on the wrong branch could rewrite shared history and silently drop someone else's commits — the kind of mistake that's easy to make in a single tool call and hard to undo once pushed.

## Verified

- `/memory` shows `CLAUDE.md` loaded from the project root.
- `/permissions` shows the allow/ask/deny rules from `.claude/settings.json`.

(Run both commands once in a fresh session to confirm before submitting.)
