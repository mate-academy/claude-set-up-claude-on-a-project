## What I put in CLAUDE.md and what I left out

I included a clear project overview, common development commands, coding conventions, and architectural overview. I deliberately left out:
- Obvious instructions like "write helpful error messages" or "write unit tests"
- Detailed file-by-file breakdowns that can be easily discovered by reading the code
- Generic development practices that apply to any project
- One-off notes or sensitive information

The content focuses on what would help Claude Code quickly understand and work effectively with this specific Express.js API project.

## Permission rules and their rationale

I added:
- **Allow**: `npm test` commands - Testing is safe and frequently needed during development
- **Ask**: `git push` commands - Prevents accidental pushes while allowing intentional ones with confirmation
- **Deny**: Reading `.env` files and force pushes - Protects sensitive environment variables and prevents destructive git operations

Without the deny rule for reading `.env`, Claude might accidentally expose sensitive information like API keys or database credentials. Without the ask rule for git push, Claude might push changes without explicit confirmation. The allow rule for npm test ensures Claude can freely run tests to verify changes.