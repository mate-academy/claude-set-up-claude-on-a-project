# NOTES.md
I ran the Claude /memory and /permissions commands. Both reflected the expected results from my changes.
## CLAUDE.md

**Kept:** 
-The four commands (`dev`, `start`, `test`, `lint` — including how to run a single test, since that's not obvious from `package.json` alone), an architecture note on how `server.js`, `routes/`, and `db/store.js` fit together (specifically the `require.main === module` guard, since that's a detail that spans two files and is easy to miss), and two conventions (CommonJS over ESM, and routing all data access through `db/store.js`).

**Left out:**
- Removed line at beginning which stated the purpose of the CLAUDE.md file. Claude already knows this. Also reduced the project description to a single sentence.
- File/folder listings — already obvious from `ls` or the README, and would just go stale.
- Generic advice like "write tests" or "don't commit secrets" — not project-specific, and explicitly asked to avoid.
- Anything about the course assignment itself beyond the one-line reminder not to touch app code — that's a one-off instruction for this session, not a lasting fact about the codebase.
- No secrets or long pasted docs — there's nothing sensitive in this repo to begin with (`.env.example` has no real values).
- In the Command section I removed the npm install line. This command is probably a one time command and would not be run very often if more than once.

## `.claude/settings.json`
I removed entries from each group so there was only one entry from each group, just to simplify my tests.
**Allow:** `npm test`— all safe, frequently run, and non-destructive, so requiring approval every time would just be friction.

**Ask:** `git push` — not dangerous on their own, but worth a confirmation since they change shared/persistent state and I'd rather review what's being committed or pushed before it happens.

**Deny:**
- `Bash(git push --force:*)` — a force-push can silently overwrite or delete commits on a shared branch. Without the deny rule, a mistaken or over-eager force-push could destroy history that isn't recoverable, especially since `ask` on plain `git push` doesn't automatically cover a `--force` variant.
- `Read(**/.env*)` - block Claude from reading any .env files.
