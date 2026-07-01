# NOTES

## CLAUDE.md

I kept four lean sections: a one-line description, the commands I actually run (`dev`, `test` with the single-file variant, `lint`), three real conventions, and a short architecture note. The conventions and architecture focus on things you can't tell at a glance from a single file — that data must go through `db/store.js`, that CommonJS is required (enforced by the ESLint config), the JSON error shape, and why `server.js` only listens when run directly.

I deliberately left out the full file tree, the dependency list, and generic Node/Express advice — all discoverable from the code and just noise in context. I also left out the course instructions and any one-off setup notes, since they don't help future coding sessions.

## Permission rules

- **allow**: `Bash(npm test:*)` and `Bash(npm run lint:*)` — safe, read-only checks I run constantly, so Claude shouldn't have to ask each time.
- **ask**: `Bash(git push:*)` — pushing is fine but outward-facing, so I want to confirm each time.
- **deny**: `Read(./.env)` and `Bash(git push --force:*)` — the first keeps secrets out of the model's context; the second prevents a force-push that could overwrite shared history.

Without the `Read(./.env)` deny rule, Claude could read real credentials into context (and potentially echo them into output or commits). Without the force-push deny, an automated push could clobber commits on a shared branch and lose someone's work.

`.claude/settings.json` is committed so the team shares these rules; `.claude/settings.local.json` stays personal and is already git-ignored.
