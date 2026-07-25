# Notes: CLAUDE.md and permissions decisions

## What I put in CLAUDE.md

- **Overview** — one line saying this is a starter Express API for the course, backed by an in-memory store. Orients a reader immediately without them having to open `server.js`.
- **Commands** — `npm run dev`, `npm start`, `npm test`, the single-file test invocation (`node --test tests/users.test.js`), and `npm run lint`. These are the commands actually needed day-to-day and match what CI runs, so there's no drift between "what the docs say" and "what actually gets checked."
- **Architecture** — a short map of `server.js`, `routes/`, `db/store.js`, `tests/`, plus the note that `server.js` only calls `app.listen` when run directly. That last detail isn't obvious from a file listing — it explains *why* tests can `require` the app without a port conflict, which would otherwise look like a strange quirk.
- **Conventions** — CommonJS (not ESM), and the JSON error-body shape (`{ error: "..." }`) with status codes. These are conventions a contributor could get wrong by guessing, since both plain CommonJS and ESM are plausible for a fresh Node project.
- **CI note** — one line stating CI runs lint + test on every push/PR, so changes should pass both locally first.

## What I deliberately left out, and why

- **No file-by-file walkthrough of routes/store internals.** The code is small and self-descriptive; restating it in prose would just go stale the next time a route changes. CLAUDE.md should describe things that aren't derivable from reading the code, not duplicate it.
- **No deployment/hosting instructions.** This is a course starter project with no real deploy target yet. Documenting a deploy process that doesn't exist would be guessing, and premature docs like that tend to mislead more than help.
- **No database/credentials guidance.** There's no real database — `db/store.js` is in-memory and resets on restart. Adding a "how to configure the DB" section would imply persistence that doesn't exist.
- **No opinions beyond what's enforced.** I didn't add style preferences (e.g. quote style, import ordering) beyond what ESLint already enforces via `npm run lint`, to avoid a doc that contradicts the linter or duplicates its config.

## Permission rules added (`.claude/settings.json`)

```json
{
  "permissions": {
    "allow": ["Bash(npm test:*)", "Bash(npm run lint:*)"],
    "ask": ["Bash(git push:*)"],
    "deny": ["Read(./.env)", "Bash(git push --force:*)"]
  }
}
```

- **allow: `npm test`, `npm run lint`** — these are read-only from the repo's point of view (no writes, no network, no shared state), and they're the commands I need to run constantly while iterating. Auto-allowing them removes prompt fatigue for the safe, high-frequency case.
- **ask: `git push`** — pushing changes a shared remote that others may pull from, so per the "affects shared systems" rule it should always get a confirmation rather than being silently allowed.
- **deny: `Read(./.env)`** — `.env` is where secrets/API keys would live. A deny here means I can never read it into context, even by accident (e.g. a broad `Read` on the directory, or a debugging detour). Without this rule, nothing stops me from cat-ing the file and then having its contents show up in a later commit message, an artifact, a shared summary, or just plain conversation output — which is how credentials leak.
- **deny: `Bash(git push --force:*)`** — force-push rewrites remote history. Without this deny, a force-push either falls under the general `git push` **ask** rule (if the user isn't paying close attention when approving, a routine-looking approval could let a history-rewriting push through) or could be allowed outright under a looser permission mode. Either way, the risk is the same: it can silently overwrite or destroy a collaborator's commits on a shared branch, and unlike a normal push, that's very hard to undo. Making it an explicit deny means it's blocked regardless of mode, and the user has to escalate manually rather than approve it in passing.
