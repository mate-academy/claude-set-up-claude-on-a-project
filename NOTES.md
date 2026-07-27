# NOTES.md

## What I included in CLAUDE.md
I described the project’s purpose, listed common commands (npm test, npm run dev), and added conventions for async/await and ESLint rules.

## What I deliberately left out
I excluded sensitive configuration details and one‑off notes to keep the file concise and secure.

## Permission rules added
- Allow: npm test  
- Ask: git push  
- Deny: reading .env and force‑pushing  

## Why the deny rule matters
Without the deny rule, Claude could accidentally read or expose environment variables or perform destructive actions like force‑pushing to the repo.
