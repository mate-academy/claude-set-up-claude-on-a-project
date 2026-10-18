# Notes: setting up Claude Code on this project

## What I put in CLAUDE.md and what I left out
I kept a one-line description, the three commands I actually run (dev, test, lint), four conventions taken from the real code (CommonJS, the error response shape, data access only through db/store.js, how tests are written), and a short architecture map. I cut what /init added that is obvious from the code or from package.json, and I did not paste the README or any long document. There are no secrets and no one-off tasks - only stable rules Claude can follow without asking.

## Permission rules and why
- allow: npm test and npm run lint - safe, run constantly, so approving them every time is just friction.
- ask: git push - it changes the shared repo, so I want to see it first.
- deny: reading .env and git push --force. Without the .env rule Claude could read real secrets and leak them into a chat, a commit or a log; a force-push can erase teammates' history and cannot be undone.

## A problem I found
The lines in .gitignore started with spaces, so Git was NOT ignoring .env and .claude/settings.local.json - a real secret could have been committed. I removed the spaces so both files are ignored.

## Verification
In a fresh session /memory showed CLAUDE.md as loaded, /permissions listed my rules (Allow: npm test, npm run lint; Ask: git push; Deny: Read(./.env), git push --force), and "How do I run the tests here?" was answered with npm test "based on the CLAUDE.md instructions".
