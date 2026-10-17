# Configuration Notes

## CLAUDE.md Choices
In `CLAUDE.md`, I included a brief one-line description of the Express API, the essential execution commands (`npm run dev`, `npm test`, `npm run lint`), the codebase architecture overview, and specific coding conventions (e.g., using specific route patterns and using `db/store.js` for data state). I deliberately omitted temporary setup notes, third-party library details, and boilerplate explanations to keep the file lean, clear, and context-efficient for Claude.

## Permission Rules Reasoning
I configured explicit permission rules in `.claude/settings.json` to balance automation and security:
- **Allow**: Testing and linting commands are safe and run frequently, so automating them speeds up workflows.
- **Ask**: Normal git pushes require human confirmation to prevent accidental or incomplete code deployment.
- **Deny**: Reading the `.`env` file is strictly forbidden to protect environment variables and API secrets. Force-pushing (`git push--force`) is denied to avoid destroying commit histories on shared branches. Without the deny rule, an AI agent could accidentally leak credentials or overwrite critical git branches during automated tasks.
