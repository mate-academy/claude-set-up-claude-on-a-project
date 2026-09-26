# Notes

## CLAUDE.md: what's in, what's out

**In:** a one-line description, the commands I actually run (`dev`, `test`, `lint`, plus how to run a single test file or a single test by name — the part people usually have to look up for `node --test`), five conventions and a short architecture note.

The conventions are rules Claude can't reliably guess and would otherwise get wrong or ask about: CommonJS only (ESLint parses as `script`, so `import` breaks lint), routes go through `db/store.js` instead of touching data directly, the `{ error }` + 400/404/201 response shape, the route comment format, and testing through `supertest(app)` without starting a server.

The architecture note explains things that need several files to understand: why `server.js` only calls `listen` when run directly, how to add a new resource, and that the in-memory store is shared across a test run, so tests shouldn't depend on exact IDs or counts.

**Out, on purpose:**
- A file-by-file listing — Claude can see the tree itself; it would just go stale.
- The course submission steps from the README — a one-off task, not how to work on the code.
- Anything from `.env` or secrets — `CLAUDE.md` is committed and loaded into every session.
- Generic advice ("write tests", "handle errors") — it costs context and changes nothing.

## Permission rules

- **allow:** `npm test`, `node --test`, `npm run lint`. Read-only checks I want Claude to run constantly without a prompt each time.
- **ask:** `git push` (visible to other people) and `npm install` (network access, changes `package-lock.json`, runs package install scripts).
- **deny:** reading/editing `./.env`, `git push --force` / `-f`, `git reset --hard`, `rm -rf`.

**Without the deny rules:** Claude could read `.env` while "looking at the config" and the real secrets would end up in the conversation (and possibly in a commit message, log or PR description). A force-push could overwrite teammates' commits on the remote, and `git reset --hard` / `rm -rf` would silently destroy uncommitted work — none of these can be undone.

**Known limits:** Bash rules match by command prefix, so `git push origin main --force` doesn't match the force-push deny rule — it is still caught by the `git push` ask rule. `Read(./.env)` only blocks the Read tool, not `cat .env` through Bash.

I also found that the repo's `.gitignore` has leading spaces on every line after the first. Git treats them as part of the pattern, so `.env` is **not** actually ignored (checked with `git check-ignore`) and a real `.env` could be committed by `git add .`. The deny rule keeps Claude from reading it, but it doesn't protect the file from being committed.

## Verification

Checked in a fresh Claude Code session in the project folder:

- `/memory` lists the project `CLAUDE.md` (at the repo root) as loaded, alongside my global `~/.claude/CLAUDE.md`.
- `/permissions` shows the rules from `.claude/settings.json` on the Allow, Ask and Deny tabs (switch with ←/→): 3 allow, 2 ask, 6 deny.
