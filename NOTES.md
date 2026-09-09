# Notes: CLAUDE.md and permissions decisions

## CLAUDE.md — what's in it, and why

**Included:**
- **Project one-liner + scope note** ("not meant to grow app features; it's the object of exercises") — prevents scope creep, e.g. Claude adding features nobody asked for.
- **Commands** (install/dev/start/test/lint, incl. single-test pattern) — saves guessing at `package.json` scripts and gets the right test invocation on the first try.
- **Architecture** (role of `server.js`, `routes/`, `db/store.js`, `tests/`, and *why* `server.js` guards `app.listen`) — the supertest-against-unbound-app pattern isn't obvious from a file listing; worth stating once.
- **Conventions** (how to add a resource, the 400/404 error-shape convention) — encodes house style so new routes match existing ones without Claude inferring it from one example each time.

**Deliberately left out, and why:**
- **Endpoint/schema details** — derivable by reading `routes/` and `db/store.js` directly; documenting them here would just go stale as soon as the code changes.
- **Business logic / roadmap** — none exists; this is a fixed teaching artifact, not a product.
- **Testing framework mechanics** (how supertest/node:test work) — standard, discoverable from the test files and `package.json`, not project-specific knowledge.
- **Deployment/CI/hosting** — out of scope; nothing like that exists for this repo.
- **Lint rule specifics** — already enforced and self-documenting via the ESLint config; restating them in prose invites drift.
- **Contribution/PR process** — single-person course repo, not a team workflow.

General rule: put in CLAUDE.md what Claude can't cheaply re-derive from the code (intent, non-obvious structure, house conventions); leave out what's already authoritative elsewhere (the code, the config, git history), since duplicated docs rot.

## Permission rules — what I added, and what a missing deny rule risks

`.claude/settings.json`:
- **allow:** `Bash(npm test:*)` — run tests without a prompt each time; safe because it only executes the project's own test suite, no mutation of anything outside the sandbox.
- **deny:** `Read(./.env)` — blocks Claude from ever reading a local secrets file into context.
- **deny:** `Bash(git push --force:*)` — blocks force-pushing.
- **ask:** `Bash(git push:*)` — a normal push still requires explicit confirmation, since it's visible to others.

**What could go wrong without these deny rules:**
- Without denying `Read(./.env)`: Claude could read API keys/credentials into context and then leak them — e.g. paste them into a commit, a log, an artifact, or an external API call — turning a local secret into an exposed one.
- Without denying `Bash(git push --force:*)`: Claude could force-push and silently overwrite or destroy remote commit history (including other people's work), which is very hard to undo, especially on a shared branch like `main`.

**Side fix while writing this:** the `deny`/`ask` arrays in `.claude/settings.json` were malformed (garbled stringified JSON instead of plain rule strings), so they weren't actually matching anything. Corrected them to clean string entries.
