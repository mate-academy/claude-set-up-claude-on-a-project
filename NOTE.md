# Notes

## What did you put in your CLAUDE.md, and what did you deliberately leave out, and why?

**What's in it:** Commands (`npm run dev`, `npm test`, running a single test file, `npm run lint`, and what CI runs), core conventions (CommonJS only, thin route handlers that delegate to `db/store.js`), and a short architecture map of `server.js`, `routes/`, and `db/store.js` — including the `require.main === module` trick that lets tests import `app` without opening a real port.

**What I left out:** Line-by-line API documentation (endpoints, request/response shapes), the actual route/store implementation details, and rationale for using an in-memory store instead of a real database. Those are either derivable straight from reading the small codebase, or they're the kind of detail that goes stale fast as the code changes — CLAUDE.md is meant to orient an agent quickly, not duplicate the source or become a maintenance burden that drifts out of sync.

## Which permission rules did you add, and what could go wrong without your deny rule?

These are the rules already present in `.claude/settings.json`:

- **allow**: `Bash(npm test:*)`, `Bash(npm run lint:*)` — runs freely without prompting.
- **ask**: `Bash(git push:*)` — prompts for confirmation before any push.
- **deny**: `Read(./.env)`, `Bash(git push --force:*)` — hard-blocked, no override.

**Without the `Read(./.env)` deny rule:** any prompt (including one from a malicious file the agent reads, like a poisoned README or issue comment) could get the agent to read the `.env` file and leak secrets — API keys, tokens, DB credentials — into the conversation, logs, or even a commit/PR body.

**Without the `Bash(git push --force:*)` deny rule:** an agent following a bad instruction (or misjudging a merge conflict) could force-push and silently overwrite/destroy commits on a shared branch — including other people's work — with no confirmation prompt to catch it first.
