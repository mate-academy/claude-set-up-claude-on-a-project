# Claude Code Setup Notes
## CLAUDE.md Choices
I included:
- **One-line description**: A quick summary of what the Express API does
- **Commands**: `npm run dev`, `npm test`, `npm run lint` — the main commands I need
- **Conventions**: Rules like "use async/await, not callbacks" and "one route file per resource"
- **Architecture**: Brief overview of server.js entry point, routes/ folder structure, and db/store.js


I deliberately left out:
- Long code explanations — Claude can read the code itself
- One-off notes or temporary reminders — they'd clutter the file
- Any sensitive information or secrets


## Permission Rules
I added:
- **Allow**: `Bash(npm test:*)` — safe to run tests without asking
- **Ask**: `Bash(git push:*)` — want to confirm before pushing
- **Deny**: `Read(./.env)` — protects sensitive credentials; `Bash(git push --force:*)` — prevents destructive force pushes


Without the deny rules, Claude could accidentally read `.env` (exposing API keys, database passwords) or force-push and destroy git history.
