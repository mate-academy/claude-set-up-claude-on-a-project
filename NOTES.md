# NOTES.md

## CLAUDE.md

**What I included:**
- A one-line description of the project (small Express API with `/health` and `/users`, in-memory store).
- **Commands**: `npm run dev`, `npm test` (plus how to run a single test file), `npm run lint`.
- **Conventions**: route handlers return JSON error bodies instead of throwing; all data access goes through `db/store.js`, never the `users` array directly; new resources get their own file in `routes/`, mounted in `server.js`.
- **Architecture**: a short map of `server.js`, `routes/`, and `db/store.js`, including the note that `server.js` only calls `app.listen` when run directly so tests can import `app` without opening a real port.

**What I left out, and why:**
- No walkthrough of every route or endpoint — that's derivable by reading `routes/`, and would go stale the moment a route changes.
- No explanation of Express or Node basics — assumed baseline knowledge, not project-specific.
- No secrets or `.env` values — `.env.example` already documents the shape of config; nothing sensitive belongs in a file that ships to every session.
- No one-off task notes (e.g. "fix the bug in X") — those belong in commits or issues, not a file meant to stay accurate long-term.

Kept it short deliberately: every line should save Claude a question, not pad the file.

## Permission rules

`.claude/settings.json`:

```json
{
  "permissions": {
    "allow": ["Bash(npm test:*)"],
    "ask": ["Bash(git push:*)"],
    "deny": ["Read(./.env)", "Bash(git push --force:*)"]
  }
}
```

- **Allow** — `npm test`: safe, read-only, run constantly; no reason to prompt every time.
- **Ask** — `git push`: not destructive, but visible to others, so I want a chance to review before it happens.
- **Deny** — `Read(./.env)`: blocks Claude from reading real secrets if a `.env` ever exists locally, even accidentally.
- **Deny** — `git push --force`: without this, a bad rebase or history rewrite could silently overwrite shared history on the remote. This is the rule that matters most — force-push is the one action here that's both easy to trigger and hard to undo.

## Verification

- Started a fresh session and ran `/memory` — `CLAUDE.md` shows as loaded.
- Ran `/permissions` — allow/ask/deny rules from `.claude/settings.json` all appear.
- Asked "How do I run the tests here?" — Claude answered `npm test` (and the single-file variant) directly from `CLAUDE.md`, without needing it explained.
