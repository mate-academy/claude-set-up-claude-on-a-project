# NOTES

## CLAUDE.md

I included the commands needed to actually work in the repo (dev/start/test/lint,
plus how to run a single test file), the two conventions that aren't obvious from
skimming one file (data access must go through `db/store.js`, and routes return
JSON error bodies instead of throwing), and a short architecture map of
`server.js`, `routes/`, `db/store.js`, and `tests/` so I know where new code
belongs without exploring the tree every time.

I deliberately left out things that are either derivable by reading the code
(e.g. exact route signatures, dependency versions) or that would go stale fast
(TODOs, in-progress work, current bug list). CLAUDE.md is checked into the repo
and read on every session, so it should only hold things that are true "by
convention" rather than "by inspection" — anything I can just grep for doesn't
belong here, since a stale instruction is worse than no instruction.

## Permissions (.claude/settings.json)

- `allow`: `Bash(npm test:*)` — running tests is safe and frequent, no need to
  prompt every time.
- `ask`: `Bash(git push:*)` — pushing affects the shared remote, so it should
  require a nod even though it's routine.
- `deny`: `Read(./.env)`, `Bash(git push --force:*)`

Without the `Read(./.env)` deny rule, an agent could read local secrets
(API keys, DB credentials) into its context and potentially echo them back in
output, logs, or a later tool call (e.g. pasting them into a commit message or
an external request) — env files are exactly the kind of thing that shouldn't
enter the model's context at all.

Without the `Bash(git push --force:*)` deny rule, an agent could force-push
over teammates' commits on a shared branch, silently discarding their work.
That's a hard-to-reverse, shared-state action, so it's blocked outright rather
than just gated behind a confirmation prompt.
