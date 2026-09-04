# NOTES.md

## CLAUDE.md

I kept it to four short sections: a one-line description, the commands I actually run (`npm run dev`, `npm test`, running a single test file, `npm run lint`, plus what CI checks), two conventions (CommonJS only — no `import`/`export`; routes never touch data directly, always go through `db/store.js`), and a short architecture note on why `server.js` only calls `listen()` when run directly (so `tests/` can import `app` and drive it with `supertest` without opening a real port).

I deliberately left out: a list of every endpoint and file (that's a few seconds of reading the code), the contents of `.env.example`, and any generic advice ("write tests", "handle errors") — none of that is specific to this project, and it would just add noise Claude has to re-read every session.

## Permissions (`.claude/settings.json`)

- **allow**: `Bash(npm test:*)` — the test command is safe and I run it constantly; no reason to confirm it every time.
- **deny**: `Read(./.env)` — blocks Claude from reading the file where real secrets would live. Without this rule, Claude could read `.env` (e.g. while debugging config) and secrets could end up quoted back in the conversation or, worse, pasted into a commit, a PR description, or a log. The `deny` rule removes that risk entirely rather than relying on Claude "remembering" not to look.
- No **ask** rule for now — the project has no destructive commands I run often enough to need a per-time confirmation gate; `git push --force` and similar are simply not something I do in this workflow.

## Verification

Confirmed in a fresh session: `/memory` shows `CLAUDE.md` as loaded, and `/permissions` lists the allow/deny rules above.
