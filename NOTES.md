# NOTES

## CLAUDE.md

I kept `CLAUDE.md` to four short sections: a one-line description, the commands I actually run (`dev`, `test`, `lint`, plus how to run a single test file), the conventions that aren't obvious from a single file, and a short architecture note.

The conventions and architecture are the parts that earn their place: that this repo uses CommonJS (enforced by the ESLint `sourceType: "script"` setting, not visible in any source file), that routes live one-per-resource in `routes/` and all data access goes through `db/store.js`, and that `server.js` only calls `app.listen` when run directly so tests can import `app` in-process. Those take reading several files to piece together, so they save the most time up front.

I deliberately left out the file tree, the dependency list, generic Express/Node advice, and anything course- or submission-related. All of that is either discoverable from the code in seconds or a one-off, and including it would just dilute the signal.

## Permission rules

- **allow** `npm test` and `npm run lint` — safe, read-only-ish commands I run constantly. Allowing them removes prompts from the normal edit-test loop.
- **ask** `git push` — pushing is worth a deliberate confirmation each time, but not an outright block.
- **deny** `Read(./.env)` and force-push (`--force` / `--force-with-lease`). Without the `.env` deny rule, Claude could read local secrets and echo them into the transcript or a commit. Without the force-push deny, a well-meaning "clean up history" could overwrite shared branch history that others depend on — a hard action to undo.

Personal overrides go in `.claude/settings.local.json`, which `.gitignore` already keeps out of the repo; the shared `.claude/settings.json` is committed so the whole team gets the same baseline.
