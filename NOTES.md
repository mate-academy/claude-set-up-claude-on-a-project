## What I put in my CLAUDE.md

I put conventions, commands, and architecture.


## What I left out of my CLAUDE.md
I left out all of the extra stuff.

## Permission rules
{
  "permissions": {
    "allow": [
      "Bash(npm test:*)"
    ],
    "deny": [
      "Read(./.env)",
      "Bash(git push --force:*)"
    ],
    "ask": [
      "Bash(git push:*)"
    ]
  }
}
