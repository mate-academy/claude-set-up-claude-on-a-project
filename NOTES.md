# Notes

## CLAUDE.md
I kept a one-line description, the commands I run (dev, test, lint, single test file), a short architecture note (server.js entry point, one router per resource in routes/, data only through db/store.js) and five conventions (CommonJS, store-only data access, one route file per resource, node:test + supertest, JSON error shape).
I cut the generic header, npm install, and the "Repository context" section from /init: it was a one-off note about this course, not a lasting project rule. I also removed details Claude can read in the code. No secrets.

## Permissions
- allow: npm test and npm run lint, safe commands I run often.
- ask: git push, so nothing leaves my machine without confirmation.
- deny: reading .env / .env.* and git push --force / -f. Without them, Claude could read secrets (API keys, passwords) or a force-push could erase the remote history.

## Verification
In a fresh session, /memory and /context showed the project CLAUDE.md loaded, /permissions listed my rules, and "How do I run the tests here?" was answered from CLAUDE.md.