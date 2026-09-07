# Notes on Claude Code Setup
## CLAUDE.md
I included the project description, key commands (dev, test, lint), coding conventions, and architecture overview. I left out specific implementation details and one-off notes because they would make the file too long and go stale quickly.
## Permissions
I added an allow rule for npm test and a deny rule for reading .env files. Without the deny rule, Claude could accidentally read and expose secrets like API keys or database passwords.

