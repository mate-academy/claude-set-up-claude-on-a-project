# NOTES.md

## CLAUDE.md — what I kept and what I cut

**Kept:** a one-line description of the API, the four commands I actually run
(`dev`, `test`, `lint`, `start`), five conventions that would otherwise cost a
round-trip question (CommonJS not ESM, quotes/semicolons, data access only via
`db/store.js`, JSON error shape with explicit status codes, no route logic in
`server.js`), and a short architecture section covering the `server.js` entry
point, one-file-per-resource `routes/`, the in-memory `db/store.js`, and how the
tests import `app`.

**Left out:** anything already obvious from the code — the dependency list, the
exact route paths, how Express is wired line by line. Also left out the
course-only instruction "don't change the app code" (a one-off, not a standing
rule) and anything about `.env` / secrets (nothing sensitive belongs in a file
that gets committed and loaded every session). The `sourceType: "script"` detail
is the one non-obvious thing I did keep, because it's the reason the ESM rule
exists.

## Permission rules

```json
"allow": ["Bash(npm test:*)", "Bash(npm run lint:*)"]
"ask":   ["Bash(git push:*)"]
"deny":  ["Read(./.env)", "Bash(git push --force:*)", "Bash(git push --force-with-lease:*)"]
```

- **allow** — `npm test` and `npm run lint` are read-only, run constantly, and
  the CI runs the same two commands, so approving them every time is pure
  friction.
- **ask** — `git push` is fine to do but I want to see each one before it leaves
  my machine.
- **deny** — `Read(./.env)` keeps real secrets out of the model context even
  though only `.env.example` exists today. `git push --force` /
  `--force-with-lease` are denied outright: without that rule a force-push could
  rewrite shared branch history and destroy teammates' commits, and it's not
  something I ever want done automatically.

## Verification

- Fresh session → `/memory` lists `CLAUDE.md` as loaded (project memory).
- `/permissions` shows the allow / ask / deny rules above from
  `.claude/settings.json`.
- Asked "How do I run the tests here?" and Claude answered `npm test` straight
  from `CLAUDE.md` with no extra explanation from me.
- `npm test` (4 pass) and `npm run lint` (clean) both run green locally.
