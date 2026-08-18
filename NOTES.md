# NOTES.md

## CLAUDE.md

I kept a one-line project description, the commands I actually run (`npm install/dev/start/test/lint`,
plus how to run a single test or lint a single file), and the architecture that takes reading
multiple files to see — the `server.js` entry point's `require.main === module` trick, one route
file per resource, `db/store.js` as the only data-access path, and inline (not middleware) validation.
I also noted the CommonJS-only convention, since it's easy to break out of habit.

I left out anything obvious from opening a file (e.g. "server.js starts an Express app"), a
directory listing, and generic advice like "write tests" — none of that is specific to this repo.

## Permissions (`.claude/settings.json`)

I allowed the commands I run constantly and that can't cause damage: `npm test`, `npm run lint`,
`npm run dev`/`start`, and read-only git (`status`/`diff`/`log`). I put `git push` on ask, since
it's the first action that leaves my machine. I denied reading `.env` and running
`git push --force` / `git reset --hard`.

Without that deny rule, Claude could read a real secret out of `.env` while investigating something
unrelated and echo it into the conversation. And force-push / hard-reset are the two git commands
that silently destroy commits — overwriting someone else's remote work or discarding uncommitted
local changes with no undo — so they're denied outright instead of left to an "ask" prompt.
