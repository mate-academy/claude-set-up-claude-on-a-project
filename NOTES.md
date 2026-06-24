# NOTES.md

## What I put in CLAUDE.md — and what I left out

I included the commands you run most in this project (`dev`, `test`, `lint`) plus the less-obvious single-test invocation, because that's the kind of thing you look up repeatedly. For architecture I focused on the two non-obvious facts: that `server.js` exports `app` without binding a port (so tests can import it safely), and that all data access is meant to go through `db/store.js`. The conventions section captures the two rules that aren't visible from reading any single file.

I left out: file-by-file descriptions (easily discovered with `ls`), the project's course context and submission steps (one-off, not useful in a working session), and anything from `.env.example` (secrets guidance belongs in the file itself, not in CLAUDE.md).

## Permission rules

```json
{
  "permissions": {
    "allow": ["Bash(npm test:*)", "Bash(npm run lint:*)", "Bash(npm run dev:*)"],
    "ask": ["Bash(git push:*)"],
    "deny": ["Read(./.env)", "Bash(git push --force:*)"]
  }
}
```

The allow rules cover the safe, read-only commands run constantly during development so Claude doesn't prompt every time. The `ask` rule on `git push` means Claude must confirm before publishing anything — a useful checkpoint. Without the `deny` on `.env`, Claude could silently read and echo real secrets (API keys, database URLs) into the conversation or a generated file. Without the deny on `git push --force`, an automated step could overwrite shared history on a branch others depend on.
