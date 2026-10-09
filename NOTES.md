# Notes: setting up Claude Code on this project

## What's in CLAUDE.md, and what I left out

I kept only what Claude can't quickly infer or would likely get wrong:

- **Commands**, including how to run a single test file or test by name. Claude would otherwise reach for `npx jest`.
- **Conventions:** CommonJS instead of ES modules, `node:test` + `supertest` instead of Jest, all data access through `db/store.js`, and the `{ "error": "..." }` response shape. Each one is phrased as a rule Claude can follow without asking.
- **Architecture:** why `server.js` exports `app` and only calls `listen` when run directly (so tests don't open a port), the "one router per resource" pattern, and the fact that the store is in memory and resets on restart.

I deliberately left out:

- A list of every file or endpoint. Claude can read `routes/` in seconds, and a list would go stale.
- Generic advice ("write clean code", "add tests").
- The course instructions themselves (e.g. "don't change app code"). That's a one-off task constraint, not a lasting project rule.
- Anything from `.env`. The file only says that secrets live there and must not be read.

## Permission rules

- **allow:** `npm test`, `node --test`, and `npm run lint`. They are read-only and run constantly, so prompting each time adds nothing.
- **ask:** `git push`, because pushing publishes work and I want to confirm it each time.
- **deny:**
  - `Read`/`Edit` on `./.env` and `cat .env`. Without these, Claude could read real secrets into the conversation (and from there into logs or a commit) just by trying to "check the config".
  - `git push --force` / `-f`, because a force push can silently overwrite other people's commits on the remote. Deny takes precedence over the `ask` rule for `git push`, so these are blocked outright.

The `Bash(cat .env)` rule is a best-effort extra. Bash rules match command prefixes, so other commands could still read the file. The `Read` deny rule is the main protection.

## Fixed along the way: .gitignore

Every line of `.gitignore` after the first was indented with spaces. Git treats those spaces as part of the pattern, so `.env` and `.claude/settings.local.json` were **not** actually ignored. I removed the leading whitespace and confirmed with `git check-ignore` that both are now ignored.

## Verification

- [ ] `/memory` in a fresh session shows `CLAUDE.md` loaded
- [ ] `/permissions` shows the allow / ask / deny rules above
- [ ] "How do I run the tests here?" is answered from `CLAUDE.md`
