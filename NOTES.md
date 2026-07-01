# NOTES: My Choices for CLAUDE.md and Permissions
## What I put in CLAUDE.md and why
I included: a one-line description, commands (npm run dev, npm test, npm run lint), conventions (snake_case, named exports), and architecture (server.js entry point, routes/ organization, db/store.js data layer). I left out: pasted long documents from README, one-off notes, and generic dev practices obvious from package.json. Shorter is stronger.
## What could go wrong without my deny rule
I added deny: Read(./.env). Without this, Claude could accidentally read and expose secrets from environment configuration files. This prevents accidental leakage of API keys, database credentials, and other sensitive values.
## Verification
I verified /memory shows CLAUDE.md loaded and /permissions displays my allow/deny rules.
