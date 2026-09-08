# Setup Notes

## CLAUDE.md Decisions
- **Included:** A concise single-line project description, primary development commands (`npm run dev`, `npm test`, `npm run lint`), architecture layout, and core coding conventions (modular routes and isolated store operations).
- **Excluded:** Verbose dependency lists, full package.json contents, repetitive code implementation details, and temporary notes to keep the context window compact, token-efficient, and signal-dense.

## Permission Rules & Security
- **Allow:** `Bash(npm test:*)` — safe and executed frequently during development to verify changes without friction.
- **Ask:** `Bash(git push:*)` — requires confirmation before sending changes upstream to avoid accidental updates to the remote branch.
- **Deny:** `Read(./.env)` and `Bash(git push --force:*)`. Without the deny rules, secrets and API credentials inside `.env` could leak into logs or prompt contexts, and a force push could overwrite remote commit history.

## Verification
- Verified loaded context via `/memory`.
- Verified permission constraints via `/permissions`.
