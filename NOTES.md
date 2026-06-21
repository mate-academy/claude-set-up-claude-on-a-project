# NOTES.md

## What went into CLAUDE.md, and what was left out

**Kept:**
- The four npm scripts and how to run a single test file — these aren't obvious from `package.json` alone (e.g. `node --test tests/users.test.js` is not a documented shortcut).
- The three-layer architecture (`server.js` → `routes/` → `db/store.js`) and the `app` export pattern that lets tests import without binding a port — this requires reading multiple files to understand.
- Two non-obvious conventions: CommonJS-only (enforced by ESLint `sourceType: "script"`) and the `no-unused-vars` exception for route args.

**Left out:**
- File listings and folder structure — these are immediately visible with `ls` and don't need repeating.
- The course task instructions from the README — those are one-off guidance, not persistent project rules.
- Generic practices like "write tests" or "handle errors" — Claude already knows these.
- Anything about `.env` or secrets — sensitive config doesn't belong in a committed file Claude reads.

## Permission rules and why the deny rule matters

**Allow** — `Bash(npm test:*)`: running tests is safe and frequent; auto-approving it removes friction with no risk.

**Ask** — `Bash(git push:*)`: a push affects the remote and is hard to undo cleanly, so a confirmation prompt is the right gate.

**Deny** — `Read(./.env)` and `Bash(git push --force:*)`:
- Without the `.env` deny, Claude could read the file and surface secrets in its output or logs, even unintentionally. A deny rule makes that impossible regardless of how the prompt is worded.
- Without the force-push deny, an autonomous action (e.g. "clean up the branch") could overwrite shared history on the remote with no recovery path.
