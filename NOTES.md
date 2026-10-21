In Claude.md I added:
- Project Description
- Commands
- Conventions
- Architecture

I left out sensitive information and long code documents.

In the Settings.json I added:

"permissions": {
    "allow": [
      "Bash(npm run dev)",
      "Bash(npm test)",
      "Bash(npm run lint)",
      "PowerShell(npm run dev)",
      "PowerShell(npm test)",
      "PowerShell(npm run lint)"
    ],
    "deny": [
      "Read(./.env)",
      "Bash(git push --force:*)",
      "PowerShell(git push --force:*)"
    ]
  }

  If we don't have the Read(./.env) rule in place it could accidentally read and potentially expose your API keys and passwords. If we don't have (git push --force:*) it could accidentally leak secrets and it could lose history.