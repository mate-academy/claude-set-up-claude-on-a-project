Update description to:
Express REST API (users + health check) backed by an in-memory store; used as the starter project for a Claude Code course.

Remove:
- `node --test tests/users.test.js` — run one test file
- `node --test --test-name-pattern="404"` — run tests whose name matches a pattern

Reason:
These commands are covered with npm test command, so no need to be added to Commands


Permission that I've added:

"allow": ["Bash(npm test:*)", "PowerShell(npm test:*)"],
"ask": ["Bash(git push:*)", "PowerShell(git push:*)"],
"deny": [
   "Read(./.env)",
   "Bash(git push --force:*)",
   "PowerShell(git push --force:*)"
]

What can go wrong without deny rule is that Claude can read my .env variable which can contains secret key


Verification:
- `/memory` shows `CLAUDE.md` loaded.
- `/permissions` shows the allow, ask, and deny rules from `.claude/settings.json`.
