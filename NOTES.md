# Notes

## Claude Code settings.json

- Global settings file: `~/.claude/settings.json`
- Project settings: `.claude/settings.json` (commit to git, shared with team)
- Local overrides: `.claude/settings.local.json` (gitignore, personal only)
- Load order: user → project → local (later overrides earlier)

### Permissions block

```json
{
  "permissions": {
    "allow": ["Bash(npm test:*)"],
    "ask": ["Bash(git push:*)"],
    "deny": ["Read(./.env)", "Bash(git push --force:*)"]
  }
}
```

- `allow`: runs without prompting
- `ask`: always prompts for confirmation
- `deny`: always blocked

### Gotchas

- Permissions must live under a `permissions` key — a bare top-level array/object won't be picked up.
- Edit the settings file, then reopen `/permissions` (or start a new session) to see changes reflected in the UI.
