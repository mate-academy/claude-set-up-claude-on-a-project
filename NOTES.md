# Setup Notes

## What did you put in your CLAUDE.md, and what did you deliberately leave out, and why?

### What I put in

- **A one-line project description.** That this is a small Express REST API (users + health check) used as the Claude Code course starter, and that the app is intentionally minimal. This frames every later decision — Claude knows not to over-engineer.
- **Commands.** `npm run dev`, `npm test`, `npm run lint`, plus how to run a single test file. These are the things I'd otherwise have to explain in every session; putting them here means Claude runs the right command the first time.
- **Architecture.** The non-obvious structural rules:
  - `server.js` only calls `app.listen` when run directly (`require.main === module`) so tests can `require("../server")` without opening a port, and it exports `app`.
  - One router file per resource under `routes/`, mounted by prefix in `server.js`.
  - All data access goes through `db/store.js` (in-memory, resets on restart); route handlers must not hold their own state.
  - Tests use `supertest` against the imported `app`.
- **Conventions.** CommonJS not ESM (`sourceType: "script"`), double quotes and semicolons, and the lint rule about unused `req`/`res`/`next`/`_`-prefixed args.

### What I deliberately left out, and why

- **Anything Claude can read from the code itself.** The exact list of endpoints, field names, and function signatures. These live in the source, they change often, and duplicating them in CLAUDE.md just creates a second copy that drifts out of date. CLAUDE.md should hold what's *not* obvious from reading the files.
- **Line-by-line style rules that ESLint already enforces.** The linter is the source of truth and it runs; restating its full ruleset here would be redundant. I kept only the couple of conventions that a reader needs stated (quotes/semicolons, the unused-args exception) so behavior is predictable before lint runs.
- **Generic Express / Node tutorials.** Claude already knows the framework. CLAUDE.md is for *this* repo's decisions, not for teaching the stack.
- **Personal / environment-specific detail** (my machine paths, secrets, ports beyond the documented dev port). That's noise for a file checked into the repo and shared by everyone.

The guiding principle: include the decisions and constraints that aren't derivable from the code (the `require.main` trick, the "all state goes through store.js" rule, CommonJS-not-ESM), and leave out anything the code, the linter, or Claude's general knowledge already covers.

## Which permission rules did you add, and what could go wrong without your deny rule?

From `.claude/settings.json`:

```json
{
  "permissions": {
    "allow": ["Bash(npm test:*)"],
    "ask":   ["Bash(git push:*)"],
    "deny":  ["Read(./.env)", "Bash(git push --force:*)"]
  }
}
```

### Rules and rationale

- **allow `Bash(npm test:*)`** — Running the test suite is safe and frequent. Auto-allowing it removes a permission prompt from the tightest part of the loop (edit → test → repeat) without giving up any real safety.
- **ask `Bash(git push:*)`** — Pushing is outward-facing and hard to undo once it's on the remote, but it's also a normal thing to want. "Ask" keeps me in the loop for every push instead of blocking it outright.
- **deny `Read(./.env)`** — Blocks Claude from reading the local secrets file at all.
- **deny `Bash(git push --force:*)`** — Blocks force-pushes entirely.

### What could go wrong without the deny rules

- **Without `deny Read(./.env)`:** `.env` typically holds secrets — API keys, DB credentials, tokens. If Claude can read it, those values can end up quoted in the conversation, in logs, or pasted into a file or commit. Even with good intentions, a secret that lands in context can leak into places you don't control. Denying the read means the secret never enters the transcript in the first place. (Note: it's a hard block, so if a task ever *legitimately* needs an env value, I'd supply it deliberately rather than have Claude slurp the whole file.)
- **Without `deny Bash(git push --force:*)`:** A force-push can overwrite remote history — clobbering commits, wiping teammates' work, or rewriting a shared branch so others' clones break. Unlike a normal push, it's genuinely destructive and often irreversible. The plain `git push` case is covered by the softer "ask" rule; `--force` is dangerous enough that I chose to deny it entirely rather than rely on catching it in an approval prompt.
