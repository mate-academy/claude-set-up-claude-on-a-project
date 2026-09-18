# NOTES

## CLAUDE.md

I kept it to four short sections: a one-line description, the commands I actually run (`npm install`, `npm run dev`, `npm start`, `npm test`, `npm run lint`), the architecture (entry point, one router per resource, the store layer, and the test layout), and two conventions pulled straight from the existing code (route handlers go through `db/store.js` rather than touching data inline, and errors come back as JSON with a status code instead of throwing).

I deliberately left out:
- The course README's task/submission instructions — that's process, not project knowledge, and it would go stale the moment the assignment changes.
- Anything about `.env` beyond what's already obvious from `.gitignore` — there are no real secrets in this starter, so documenting a secrets policy here would be a guess.
- A description of every file in `routes/`/`tests/` — that's one `ls` away and would just drift out of sync as files are added.
- The `.eslintrc.json` rule details — they're enforced by `npm run lint` itself, no need to duplicate them in prose.

## Permissions (.claude/settings.json)

- **allow**: `Bash(npm test:*)` — it's read-only in effect (runs the test suite, touches nothing outside the process) and I run it constantly, so it shouldn't need a prompt every time.
- **ask**: `Bash(git push:*)` — pushing is visible to others, so I want a checkpoint each time even though it's not destructive by itself.
- **deny**: `Read(./.env)` and `Bash(git push --force:*)` — without the first, Claude could read real secrets straight out of a local `.env` file and potentially echo them into a response or commit; without the second, an agent resolving a merge conflict or "cleaning up" a branch could force-push over someone else's commits and silently destroy history on the remote.
