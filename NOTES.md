# NOTES.md

What did you put in your CLAUDE.md, and what did you deliberately leave out, and why?
Actually, the below changes are reworked and the original CLAUDE.md is used. 

## left out:
### from commands:

###- `npm test -- tests/users.test.js` — run a single test file

### from Architecture
### - `tests/` — integration-style tests that go through the HTTP layer (`supertest` against the exported `app`), not unit tests of individual functions.

### from Conventions
###- `.env` holds real config/secrets and is git-ignored; `.env.example` documents the shape and must stay free of real values.



.claude/settings.local.json updated to add /permissions  
{
  "enabledMcpjsonServers": [
    "playwright",
    "context7",
    "deepwiki"
  ],
  "permissions": {
    "allow": ["Bash(npm test:*)"],
    "ask": ["Bash(git push:*)"],
    "deny": ["Read(./.env)", "Bash(git push --force:*)"]
  }
}

