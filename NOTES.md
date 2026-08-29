# Notes on setting up Claude Code for this project

## What I included in CLAUDE.md, what I left out, and why

I included the exact server address in the Commands section (`http://localhost:3000`) — a rule is only useful if it's specific, and I wanted to be specific rather than vague. I also added a coding convention requiring descriptive, camelCase variable names.

I deliberately left out the programming language / stack (Node.js, Express) because that's something Claude already infers by reading the project files when running `/init` — repeating it would be redundant.

## Permission rules I added to settings.json, and what could go wrong without them

```json
{
  "permissions": {
    "allow": ["Bash(npm test:*)"],
    "ask": ["Bash(git push:*)"],
    "deny": ["Read(./.env)", "Bash(git push --force:*)"]
  }
}
```

- `allow: Bash(npm test:*)` — running the test suite is safe and read-only, so it doesn't need confirmation every time.
- `ask: Bash(git push:*)` — a normal push should still ask for confirmation, since it changes shared/remote state and I want to review it before it happens.
- `deny: Read(./.env)` — without this, Claude could read `.env` and potentially expose secrets (API keys, credentials) in its output or in a commit.
- `deny: Bash(git push --force:*)` — without this, Claude could force-push and overwrite remote history irreversibly, potentially destroying work (mine or a teammate's) with no way to recover it.

## Verification

I verified both by inspecting the exact files that `/memory` and `/permissions` read, since this document was finished from a Claude Code session rooted in a different project directory (`/memory` and `/permissions` reflect the active session's own working directory, so they can't be run against a sibling project from there):

- **`/memory` — CLAUDE.md loaded**: `CLAUDE.md` is present at the project root (`./CLAUDE.md`), which is the only memory file discovered for this project — no user-level `~/.claude/CLAUDE.md` and no `CLAUDE.md` in any parent directory exist, so `/memory` would list this project's `CLAUDE.md` as the sole source.
- **`/permissions` — rules in place**: `.claude/settings.json` is the only permissions source for this project (no `.claude/settings.local.json`, and the user-level `~/.claude/settings.json` carries no `permissions` key that could override it), and it contains exactly the `allow` / `ask` / `deny` rules listed above — so `/permissions` would show those three rules with no conflicting overrides.
