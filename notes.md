# Notes: CLAUDE.md and permissions

## What's in CLAUDE.md, and why

- **One-line project description** — orients Claude before it reads any code: "starter Express API for the course projects."
- **Commands** (`npm run dev`, `npm test`, single-file test invocation, `npm run lint`) — these aren't guessable from file structure alone, and re-deriving them by reading `package.json` scripts every session wastes a step. Worth stating explicitly.
- **Conventions**:
  - CommonJS, not ESM — genuinely non-obvious from the code alone until you check `package.json` for `"type": "module"`. Saves Claude from writing `import` and having it fail.
  - One route file per resource, mounted in `server.js` — a structural rule, not something enforced by a linter, so it's easy for a model to violate by putting a new route inline.
  - Route handlers only talk to data through `db/store.js` — this is the one architectural rule most likely to get broken by a "just make it work" edit (e.g., reaching into an array directly). Worth calling out because violating it is easy and looks fine at first glance.
- **Architecture** — `server.js` entry point, `db/store.js` in-memory store, CI pipeline — gives Claude the shape of the repo in a few lines instead of it having to explore `server.js`, `routes/`, and `.github/workflows/` separately every time.

## What was deliberately left out, and why

- **Per-endpoint business logic / API reference** — this is small enough (a couple of route files) that reading the code is faster and more accurate than maintaining a parallel description that will drift out of sync.
- **Dependency list / versions** — already accurate and authoritative in `package.json`; duplicating it in CLAUDE.md just creates a second place to go stale.
- **Deployment / environment info** — this is a practice project with no real deployment target, so there's nothing true to say yet. Add it if that changes.
- **Testing philosophy / coverage goals** — no strong opinions to enforce beyond "tests exist and use `node --test` + `supertest` against the exported app," which is already covered under Architecture.
- General principle: CLAUDE.md should hold what a fresh read of the code *wouldn't* tell you (naming conventions, "always route through this module," commands), not a second copy of things the code or `package.json` already say correctly.

## Permission rules (`.claude/settings.json`)

```json
{
  "permissions": {
    "allow": ["Bash (npm test:*)"],
    "deny": ["git push --force:*"]
  }
}
```

- **Allow `npm test:*`** — running the test suite is safe, repeatable, and side-effect-free (in-memory store, no real network/deploy), so it's a reasonable thing to let Claude run without a prompt each time.
- **Deny `git push --force:*`** — force-push rewrites remote history. Without this rule, an agent that's cleaning up commits, rebasing, or "fixing" a bad push could force-push over a branch and silently discard commits — its own earlier work, or someone else's, if the branch is shared. Since a force-push is hard to reverse (the old remote history may already be gone once pushed) and Claude Code otherwise treats hard-to-reverse actions as things to confirm rather than block outright, an explicit `deny` makes this one non-negotiable instead of relying on the agent asking first every time.
