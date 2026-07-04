# Notes

- Added a short project description to `CLAUDE.md`, keeping it strictly project-relevant — no user preferences, just concise, useful context for Claude.
- Added project permissions in `.claude/settings.local.json`: allowed `npm test`, ask before `git push`, and denied reading `.env`. The deny rule is important to keep Claude from accessing sensitive data in the project.
