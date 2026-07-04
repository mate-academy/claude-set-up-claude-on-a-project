# Notes

## CLAUDE.md — what I kept and what I cut

I treated CLAUDE.md as instructions for *Claude to operate on the code*, not as background for a human reader. My test for every line: would Claude get this wrong without it, and is it hard to discover on its own? Every line loads into context each session, so length is a real cost — shorter is stronger.

**Kept:**
- The `require.main === module` guard in `server.js`, flagged as "preserve this." It's the single most important non-obvious fact: it's *why* the tests can `require("../server")` and get `app` without opening a real port. Removing it would make the server call `listen()` on import and break the test setup.
- The CommonJS rule **with its reason** ("`sourceType: script`, so `import` will fail"). The reason isn't fluff for a human — it stops a future session from "fixing" a lint error by switching ESLint to `sourceType: module`, which would be the wrong repair.
- The single-test commands (`node --test <file>` and `--test-name-pattern`). These aren't scripts in `package.json`, so Claude can't discover them by reading it — exactly the kind of thing CLAUDE.md should carry.
- The "starter project / in-memory store" framing, because it signals the app is *intentionally* trivial and shouldn't be over-engineered with a real database or auth.

**Cut:**
- `npm start` — it's a standard script sitting in `package.json`, so Claude discovers it for free.
- "keep both passing" (on the CI line) — the valuable, non-discoverable facts are *lint runs before test, on Node 22, gating every PR*; "keep both passing" was a generic exhortation that added length without changing behavior.

The general principle: a line's value is roughly *inverse* to how discoverable the fact is, and redundancy is about repeating a *job*, not a topic (the `routes/` map and the "one file per resource" rule survive because one describes and one instructs).

## Permissions — my rules and the risk

- **allow**: `Bash(npm test:*)`, `Bash(git status:*)` — read-only or safe commands I run constantly; confirming each time is pure friction. (I used `:*` so flags like `git status -s` still match — without it, the rule only matches the bare command.)
- **ask**: `Bash(git push:*)`, `Bash(git commit:*)`, `Bash(rm:*)` — the middle bucket for things I want available but deliberate. `push` is outward-facing and visible to others; `rm` is destructive; `commit` gets a checkpoint so I can confirm the message is clear before it's written. I chose `ask` over `deny` because I genuinely need all three sometimes — `deny` would block them entirely and force me to edit settings to get work done.
- **deny**: `Read(./.env)` — secrets must never enter Claude's context.

**What could go wrong without the deny rule:** if Claude could read `.env`, the secrets in it (e.g. a `DATABASE_URL` with credentials) could be pulled into its context and then leak into a commit, a log line, or a message it writes — somewhere they'd get committed to git history or shared, even if deleted later. Denying at the `Read` tool level blocks the file no matter how it's referenced.
