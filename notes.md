# Notes: Claude Code Permission Choices

Explains the reasoning behind the permission-related settings in this repo's
`CLAUDE.md` and `.claude/settings.json`.

## `.claude/settings.json`

```json
{
  "permissions": {
    "allow": [
      "Bash(npm test:*)"
    ],
    "deny": [
      "Read(./.env)"
    ]
  }
}
```

### `allow: "Bash(npm test:*)"`
- Auto-approves any `npm test` invocation (including variants like
  `npm test -- users.test.js`), since this is the primary feedback loop
  while working on the API.
- Low risk: running the test suite doesn't mutate the filesystem, hit the
  network, or touch real secrets — the in-memory store resets on restart.
- Removes friction for the highest-frequency command without opening up
  broader `Bash(*)` access.

### `deny: "Read(./.env)"`
- Blocks Claude from ever reading the real `.env` file, which holds actual
  secrets (per the `CLAUDE.md` convention that real secrets live in `.env`,
  not `.env.example`).
- `.env.example` is intentionally left readable — it documents the shape of
  required vars without exposing values, so Claude can still reason about
  config without needing the real secrets.
- This is a deny rule rather than relying on `.gitignore` alone, because
  git-ignoring a file keeps it out of commits but doesn't stop Claude from
  reading it locally during a session.

## `CLAUDE.md` — "Other Rules"

### "Never grant permission to delete files"
- This is a blanket restriction on file-deletion permissions, independent
  of which files or directories are involved.
- Rationale: deletions are hard to reverse, and this repo is a teaching
  artifact (the Claude Code course starter project) — an accidental delete
  is disproportionately costly relative to any time saved by automating it.
- Deliberately broader than a `deny` rule scoped to specific paths in
  `settings.json`: the instruction is meant to hold even as the project
  grows and new files/directories are added, without needing the
  permissions file updated every time.

## Related scoping decision (not a permission, but adjacent)

`CLAUDE.md` also states: *"do not change the app code (`server.js`,
`routes/`, `db/store.js`) unless explicitly asked."* This isn't enforced
via `settings.json` allow/deny rules — it's a soft scope boundary in
`CLAUDE.md` instead, because:
- The task boundary is about *intent* (this is a fixed course starter,
  not a project under active feature development), not about a class of
  dangerous operations — so a permission rule would be the wrong tool.
- Edits to those files are still sometimes legitimate ("unless explicitly
  asked"), which a hard `deny` rule can't express — `deny` is all-or-nothing.
