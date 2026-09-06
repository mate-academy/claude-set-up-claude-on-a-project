# NOTES.md

## CLAUDE.md

I kept it to four short parts: a one-line project description, the three npm commands I actually run (`dev`, `test`, `lint`), a brief architecture note (entry point → routers → single data-access layer in `db/store.js`), and two conventions I found consistently followed in the existing code (always go through `db/store.js`, return JSON error bodies with proper status codes instead of throwing).

I deliberately left out: a file-by-file listing of `routes/` and `db/` (Claude can read the directory itself), any mention of `.env.example` or secrets handling (nothing sensitive to document, and I don't want CLAUDE.md pointing at env details), and generic advice like "write tests" or "handle errors" that isn't specific to this repo. Nothing here was a one-off task note — everything should still be true next month.

## Permissions

- **Allow**: `Bash(npm test:*)` and `Bash(npm run lint:*)` — both are safe, read-only-in-effect commands I'll run constantly while iterating, so I don't want to approve them every time.
- **Ask**: `Bash(git push:*)` — pushing is fine to do often, but I want a confirmation prompt each time since it affects the shared remote.
- **Deny**: `Read(./.env)` and `Bash(git push --force:*)` — without the first, Claude could read real secrets out of a local `.env` file and potentially echo them into a response or a commit; without the second, a force-push could silently overwrite someone else's commits on the remote branch. Both are the kind of mistake that's hard or impossible to undo, so they're blocked outright rather than left to an "ask" prompt.
