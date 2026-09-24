# NOTES.md

## CLAUDE.md: what's in, what's out, and why

I kept CLAUDE.md to four things Claude can't reliably re-derive by reading the code: the one-line purpose of the app, the exact commands to run/test/lint it, the two or three conventions that aren't enforced by a linter (thin route handlers, all data access funneled through `db/store.js`), and a short map of how the three main pieces — `server.js`, `routes/`, `db/store.js` — fit together, since `server.js` conditionally calling `app.listen` is a non-obvious reason tests can `require("../server")` safely.

I deliberately left out anything the code or tooling already documents: full API/route documentation (that's `routes/*.js` plus the README), a restatement of what `eslint:recommended` already enforces, deployment/CI details (there's no deployment target for this sample app), and anything about auth, persistence, or scaling — none of that exists here, so writing about it would be fabricating architecture. I also skipped restating `.env.example`'s contents since that file is self-explanatory and CLAUDE.md would just go stale the moment it changed.

## Permissions

In `.claude/settings.json` I set:
- **allow**: `Bash(npm test:*)`, `Bash(npm run lint:*)` — these are read-only/idempotent dev-loop commands with no side effects outside the repo, so auto-approving them just removes friction.
- **ask**: `Bash(git push:*)` — pushing changes remote state that other people (and CI) can see, so it should always get a human look before it happens, even though it's usually fine.
- **deny**: `Read(./.env)` and `Bash(git push --force:*)`.

Without the `Read(./.env)` deny rule, Claude could open the real `.env` file (which, per `.env.example`, is where actual secrets like a `DATABASE_URL` with embedded credentials would live) and pull those values into its context — from there they could end up echoed back in output, pasted into a commit message, or surfaced in a shared conversation. `.env` being git-ignored stops it from reaching the repo, but it doesn't stop Claude from reading and re-exposing it, which is what the deny rule is actually for.

Without the `Bash(git push --force:*)` deny rule, a force-push could rewrite remote branch history and silently discard commits a teammate has already pushed — a hard-to-reverse, shared-state action that a generic "ask before pushing" rule wouldn't necessarily catch if a force-push got bundled into an otherwise-approved push command.
