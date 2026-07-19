# NOTES

Explains the two Claude Code config files in this repo: `CLAUDE.md` and `.claude/settings.json`.

## CLAUDE.md

This is project-level memory, checked into the repo so every contributor (and Claude) sees the same context automatically — no one has to re-explain the project each session.

What's in it and why:

- **One-line project description** — tells Claude (and new contributors) what this is at a glance: a small in-memory Express API used as the course starter.
- **Commands** (`npm run dev`, `npm test`, single-file test, `npm run lint`) — so Claude runs the actual project scripts instead of guessing at flags or reinventing a test command.
- **Architecture** — where routers, the in-memory store, and tests live, and *why* `server.js` guards `app.listen` behind `require.main === module` (so tests can `require("../server")` and hit the app in-process via supertest, without opening a real port). This kind of "why" is exactly what CLAUDE.md is for — things you can't infer from just reading file names.
- **Conventions** — no real database (in-memory store is intentional, not a gap), secrets go in `.env` and never get hardcoded, and CI expects both lint and tests to pass. These are guardrails so Claude doesn't "fix" things that are deliberate design choices (e.g. don't suggest adding Postgres).

Note there are two other CLAUDE.md files layered on top of this one:
- `~/.claude/CLAUDE.md` — global, personal preferences across all your projects (e.g. named exports only, comment every function).
- `~/Desktop/CLAUDE.md` — a folder-level one just above this repo (currently just a project nickname).

Claude Code merges all of these together, with the most specific file (this repo's) taking precedence on conflicts.

## .claude/settings.json — permission rules

Controls which tool calls Claude can run without asking, which always need approval, and which are blocked outright. Rules are matched against the tool name and its argument pattern.

```json
{
  "permissions": {
    "allow": ["Bash(npm test:*)"],
    "ask": ["Bash(git push:*)"],
    "deny": ["Read(./.env)"]
  }
}
```

- **`allow: ["Bash(npm test:*)"]`** — running the test suite (any `npm test ...` invocation) never prompts. It's read-only from the repo's perspective (no side effects outside the working tree), so it's safe to run freely and would otherwise be an annoying, constant interruption.
- **`ask: ["Bash(git push:*)"]`** — pushing always requires explicit confirmation, even if the user's general permission mode would otherwise auto-approve Bash commands. Pushing affects shared/remote state and is hard to undo cleanly, so it's called out specifically rather than left to default behavior.
- **`deny: ["Read(./.env)"]`** — Claude is blocked from ever reading the local `.env` file, full stop, regardless of permission mode. This file holds real secrets (see `.env.example` for the shape); denying the read prevents secrets from ever entering the conversation/context, where they could be echoed back, logged, or leaked.

Together these three rules encode a simple policy: low-risk/reversible actions (tests) are frictionless, high-impact/hard-to-reverse actions (push) require a human in the loop, and anything touching secrets is off-limits entirely.
