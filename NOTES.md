# Notes on CLAUDE.md and .claude/settings.json

## What's included in CLAUDE.md and why

- **Commands**: `npm run dev`, `npm test`, and `npm run lint` are the three commands I actually run in a normal working session, so those are the ones documented — nothing speculative like a `build` or `deploy` step, since those don't exist yet in this repo.
- **Conventions**: I kept this to rules that aren't visible from reading the code once — e.g. "use `db/store.js`, not direct calls in route handlers" is a rule about *where new code should go*, not something Claude Code could infer just by looking at the current files. I limited it to a handful of high-value rules rather than an exhaustive style guide, so it stays something a future session will actually read.
- **Architecture**: Only documents what's actually in the repo (`server.js`, `routes/`, `db/store.js`). I deliberately did not invent details about a database engine, auth, or deployment target, since asserting architecture that doesn't exist would mislead future sessions more than it would help them.

## What's excluded and why

- No mention of specific business logic inside individual routes — that changes often and belongs in the code/tests, not in a file meant to give stable, high-level orientation.
- No environment-specific values (ports, database URLs, API keys) — those belong in `.env`/config, not in a file that gets committed and read by an AI agent by default.

## Why the deny rules matter

`.claude/settings.json` controls what Claude Code is allowed to do *without asking first*. The deny rules exist because a coding agent can misread an ambiguous instruction, follow a bad suggestion from a file it's reading, or just make a mistake — and some actions are expensive or dangerous enough that "ask me first" isn't good enough; they should never happen automatically at all:

- **`.env` files are denied for read and edit** so Claude Code can't accidentally leak secrets (API keys, database credentials) into its output, or overwrite them.
- **`rm -rf`, `sudo`, and force-push are denied** because they're destructive and hard or impossible to undo — a single wrong path or branch name could delete work or history permanently.
- **`curl` is denied** to reduce the risk of the agent sending repo contents or secrets to an external URL (accidental exfiltration), whether from a misunderstanding or from following an injected instruction in a file it read.

Everything else that's routine but still worth a human glance (installing new dependencies, committing, pushing, editing `package.json`) is in `ask`, not `allow` or `deny` — common enough that blocking it outright would be annoying, but consequential enough that it shouldn't happen silently.
