in claude.md i put a one-sentence description, commands, conventions and the architecture of the project

permission rules are:
    "allow": [
      "Bash(npm test:*)"
    ],
    "deny": [
      "Read(.env)"
    ],
    "ask": [
      "Bash(git push:*)"
    ]

without the deny-rule, sensitive data could be spreaded to other persons
  