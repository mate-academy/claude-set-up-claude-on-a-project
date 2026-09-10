# Notes

## 2026-09-10
- Configured permission rules in `.claude/settings.json`:
  - `deny`: `Read(./.env)` — Claude must not read the `.env` file, since it may contain data whose disclosure could lead to a vulnerability.
  - `deny`: `Bash(git push --force:*)` — Claude must not force-push, since it can overwrite or destroy remote history.
  - `ask`: `Bash(git push:*)` — a regular push still requires confirmation before it runs.
  - `allow`: `Bash(npm test:*)` — running tests is safe and reversible, so it's allowed without prompting.
