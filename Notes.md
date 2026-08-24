# Project Setup Notes

## CLAUDE.md Choices
I included a one-line project description, fundamental scripts (`npm run dev`, `npm test`, `npm run lint`), key architecture points, and coding conventions (using `routes/` for endpoints and `db/store.js` for data access). 

I deliberately left out setup instructions, temporary task lists, variable definitions, and `.env` secret examples. The goal was to keep the context memory lightweight, clear, and focused only on broad codebase rules rather than dynamic or sensitive code elements.

## Permission Rules & Security
I added `allow` rules for safe, frequent operations like testing and linting (`npm test*`, `npm run lint*`). I set an `ask` rule for `git push*` to maintain full manual control over pushing code to remote repositories.

The `deny` rules block access to sensitive environment files (`Read(./.env)`) and destructive actions (`git push --force*`). Without these `deny` rules, an automated model might accidentally log, read, or upload secret keys, or overwrite remote Git repository history during refactoring tasks.

## Verification
- Verified `CLAUDE.md` is loaded via `/memory`.
- Verified permission rules are correctly evaluated via `/permissions`.