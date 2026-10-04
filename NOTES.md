# NOTES

## CLAUDE.md: what I kept and what I cut

I ran /init to generate a draft, then asked Claude to explain each line in plain English and say whether it could work it out from the code on its own. I kept only what it couldn't:

- the three commands used most (dev, test, lint)
- the rule to use the existing node:test setup and not add Jest or Mocha, a preference Claude would otherwise have to guess
- the rule never to read or commit .env, a safety policy
- a short architecture note: server.js is the entry point, one route file per resource, and all data goes through db/store.js, including the Number(id) detail, which is an easy trap
- a line saying the README's tasks are course scaffolding, so Claude doesn't treat them as features to build

I cut npm install, the extra notes about ports and CI, the CommonJS and lint-exemption rules (lint already enforces them), and the error-response format (visible in the code). In a five-file app, most of the draft repeated what Claude can read for itself. A CLAUDE.md should hold what it can't: local preferences, safety rules and traps. It contains no secrets, long documents or one-off tasks.

## Permission rules

- Allow: npm test and npm run lint. They only check the code, are safe, and are run often, so there's no need to approve them each time.
- Ask: git push. It sends work to GitHub where others can see it, so I want to confirm each time.
- Deny: reading .env, and git push --force.

Without the .env deny rule, Claude could open the file while troubleshooting, and real passwords or API keys would be sent as part of the conversation and could end up in output or a commit. Writing "never read .env" in CLAUDE.md is only a request; the deny rule actually enforces it. Without the force-push deny, Claude could overwrite history on GitHub and permanently erase work.

I chose not to allow npm run dev, because it keeps running until stopped.

## Verification

In a fresh session, /memory opened ./CLAUDE.md, confirming it loads. /permissions listed my allow, ask and deny rules. It also showed computer-use rules from my personal settings, so I checked that .claude/settings.json contains only the five project rules and nothing personal is shared. Asking "How do I run the tests here?" returned npm test without further explanation.
