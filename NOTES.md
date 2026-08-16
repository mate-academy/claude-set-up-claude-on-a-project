# Notes

## 1. CLAUDE.md — what's in, what's out, and why

**In:** just three sections — Commands (dev/test/lint, plus how CI runs them), Conventions (route-per-resource, all data access through `db/store.js`, error shape), and Architecture (the `server.js` / in-process `supertest` pattern, the in-memory store). Everything in it is either non-obvious from reading the code once (e.g. *why* `server.js` guards `app.listen` with `require.main === module`) or a rule that isn't self-enforcing (e.g. "never inline data access in route handlers" — nothing stops you from doing it wrong).

**Left out:** API endpoint docs/route list, deployment/infra instructions, a database schema, and any business-logic explanation. Reason: this is a teaching project with in-memory data and no real deployment target, so those sections would either be empty, fake, or redundant with the code itself — routes are one file per resource and easy to read directly. CLAUDE.md is meant to stay short enough to actually be read, not become a second copy of the codebase that drifts out of sync.

## 2. Permission rules — what we added, and the risk without deny

From `.claude/settings.json`:

- **allow** — `npm test`, `npm run lint`, `npm run dev` run without a prompt. These are safe, repeatable, local-effect-only commands, so friction here just slows down normal iteration.
- **ask** — `git push` requires confirmation each time. Pushing affects shared/remote state, so it shouldn't be silently auto-approved even though it's routine.
- **deny** — `Read(./.env)`, `git push --force`, `rm -rf` are blocked outright, no prompt.

**Without the deny rules**, each of these would fall back to a normal permission prompt (or worse, get bundled into an already-approved broader pattern) instead of being hard-blocked:
- `Read(./.env)` — an agent following a reasonable-looking task ("check why auth is failing") could read and then quote secrets straight into the conversation/output.
- `git push --force` — could silently overwrite a teammate's commits on a shared branch with no way to get them back.
- `rm -rf` — a misfired cleanup command could delete uncommitted work or the whole working tree.

Deny rules exist because "ask" only helps if a human reads the prompt carefully every time; for actions that are destructive or leak secrets, an outright block is safer than relying on that.

## Verification

Ran `/memory`, which showed `CLAUDE.md` as a loaded project instruction file, and `/permissions`, which showed the allow/ask/deny rules above matching `.claude/settings.json`.
