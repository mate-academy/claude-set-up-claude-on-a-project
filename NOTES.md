# Notes

## What I put in CLAUDE.md and what I left out

I generated a first draft with Claude ("Create a CLAUDE.md for this project") and then trimmed it.
I kept four parts: a one-line description, the commands I actually run (`npm run dev`, `npm test`, a single test file, `npm run lint`), a short architecture note (`server.js` exports `app` and only listens when run directly, one router per resource in `routes/`, data only through `db/store.js`, `supertest` tests), and four conventions written as "use X, not Y" rules (data access only via the store, the `{ error }` response shape with 400/404, `node:test` + `supertest` instead of Jest/Mocha, CommonJS instead of ES modules).

I deliberately left out the auto-generated header sentence, `npm start` (I never use it), the full route list and JSON shapes (Claude sees them as soon as it opens the files), the ESLint unused-args detail (the linter already enforces it), and anything sensitive — no values from `.env`. Shorter rules get followed more reliably.

## Permission rules

- **allow**: `npm test`, `npm run lint`, `git status`, `git diff` — safe, read-only or test commands I run constantly, so no confirmation prompts.
- **ask**: `git push` — I want to confirm every push to the shared remote.
- **deny**: reading `.env`, `git push --force`, `rm -rf`.

I work on Windows, where Claude Code runs shell commands with its `PowerShell` tool instead of `Bash`. My first version had only `Bash(...)` rules and `npm test` still asked for approval, so every command rule is listed for both tools. I also first denied `.env.*`, which blocked the harmless `.env.example`, so the deny rule now targets only `.env`.

Without the deny rules Claude could read real secrets from `.env` into the conversation (and from there into logs or commit messages), overwrite teammates' history with a force-push, or delete files that cannot be recovered. These are mistakes where a single slip is too expensive, so they are hard denies, not just a rule in CLAUDE.md.

## Verification

- `claude --version` → `2.1.197 (Claude Code)`, signed in.
- Asked "What's in this project?" — the answer matched the repo files.
- In a fresh session Claude reported `CLAUDE.md` at the project root as the only loaded memory file (what `/memory` shows).
- Permission check in a fresh session: `npm test` ran without a prompt (4/4 passed), `.env.example` could be read, reading `.env` was denied — the allow and deny rules from `.claude/settings.json` are active (what `/permissions` lists).
- Asked "How do I run the tests here?" — Claude answered `npm test` straight from CLAUDE.md.
