# Notes

## CLAUDE.md
I kept a one-line project description, the three npm commands, a short list of conventions, and a five-line architecture map. The conventions are things Claude can't reliably guess from a quick read and would otherwise ask about: CommonJS rather than ESM, `node:test` + `supertest` rather than Jest, the `{ error }` response shape, routes going through `db/store.js`, and not adding dependencies unasked.

I left out what's obvious from the code (the individual endpoints, the sample users, how Express works), anything that will go stale (version numbers, file contents), one-off tasks, and anything sensitive (no secrets or `.env` values). Every extra line costs context on every session, so shorter is stronger.

## Permissions (`.claude/settings.json`)
- **allow:** `npm test` and `npm run lint` — safe, read-only checks I run constantly, so no prompts.
- **ask:** `git push` — I want to confirm each time what leaves my machine.
- **deny:** reading `./.env`, and force-pushing (`--force` / `-f`).

Without the `.env` deny rule, Claude could read real secrets (API keys, database credentials) into the session, where they could be echoed in output, logs or a transcript. Without the force-push deny rule, a mistaken or over-eager command could overwrite remote history and destroy teammates' work.

## Verification
- [ ] `claude --version` runs
- [ ] `/memory` shows `CLAUDE.md` loaded
- [ ] `/permissions` shows the allow / ask / deny rules above
- [ ] Asking "How do I run the tests here?" is answered from `CLAUDE.md`
