# Notes

## What I put in CLAUDE.md

- **Commands**: `npm run dev`, `npm test`, `npm run lint`, plus how to run a single test file (no filter script exists, so I called that out explicitly rather than let it be guessed at).
- **Conventions**: CommonJS (not ESM), double quotes + semicolons, one router file per resource under `routes/`. These are things a model could get wrong by defaulting to more "modern" or generic JS style, so they're worth stating even though they're visible in the code.
- **Architecture**: how `server.js` wires routers and gates `app.listen` behind `require.main === module` (the reason `tests/` can import `app` directly with supertest), and that routes never touch data directly — they go through `db/store.js`. This is the kind of *why* that isn't obvious from reading any single file in isolation; it's the connective tissue between files.

## What I deliberately left out, and why

- **Dependency list / versions** — `package.json` is authoritative and changes independently of this file; duplicating it just creates a second place to go stale.
- **Full API reference (routes, request/response shapes)** — derivable by reading `routes/*.js` directly; a CLAUDE.md that mirrors the code word-for-word adds no signal and rots the moment a route changes.
- **ESLint rule details** — it's `eslint:recommended` plus `npm run lint`; enumerating every rule is noise the linter itself already enforces.
- **Data persistence / database migration plans** — there is no real database yet (in-memory store, resets on restart). Speculating about a future DB layer would be designing for a hypothetical that doesn't exist.
- **Deployment / hosting instructions** — out of scope for a course starter repo; nothing in the repo (no Dockerfile, no deploy config) suggests this project has a target environment yet.

The guiding principle: CLAUDE.md should hold context a model can't cheaply re-derive by reading the code (the *why*, the non-obvious wiring), not a restatement of what's already legible from the files.

## Permission rules added (`.claude/settings.json`)

```json
{
  "permissions": {
    "allow": ["Bash(npm test:*)"],
    "ask": ["Bash(git push:*)"],
    "deny": ["Read(./.env)", "Bash(git push --force:*)"]
  }
}
```

- **allow** `npm test:*` — running the test suite is safe, local, and repeatable, so it shouldn't need a prompt every time.
- **ask** `git push:*` — pushing affects shared/remote state, so it should always get a confirmation rather than run silently.
- **deny** `Read(./.env)` and `Bash(git push --force:*)` — see below.

I verified that /memory shows CLAUDE.md as loaded and /permissions displays the allow/ask/deny rules configured above.

## What could go wrong without the deny rules

- **Without `deny Read(./.env)`**: `.env` is git-ignored specifically because it holds real secrets (per the Architecture section — config comes from environment variables). Without the deny rule, an agent could read it while debugging or exploring config, and those secrets would then land in the conversation transcript, in any output copied elsewhere, or worse, get echoed into a commit message, log line, or pasted into an issue/PR — none of which are easily undone once a secret has been exposed.
- **Without `deny Bash(git push --force:*)`**: a force-push overwrites remote history. If an agent force-pushes while "cleaning up" a branch or resolving what looks like a conflict, it can silently discard commits a teammate already pushed, with no local trace that anything was lost. That's a hard-to-reverse, other-people-affecting action, which is exactly the category this rule exists to block outright rather than just prompt for.

