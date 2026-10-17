# NOTES.md

## CLAUDE.md

I included a short project description, common commands (`npm run dev`, `npm test`, `npm run lint`), coding conventions, and the basic architecture. I deliberately left out obvious code details, one-off notes, and sensitive information to keep the file short, clear, and useful for Claude.

## Permission Rules

I haven't configured permission rules yet. I would allow common development commands like `npm test` and `npm run lint`, and deny access to sensitive files such as `.env`. Without the deny rule, Claude could accidentally read or expose API keys, passwords, or other secrets.
