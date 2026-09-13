## What I put in CLAUDE.md

I included:
- A one-line description of what the project does (Express.js API starter for Claude Code course)
- The most commonly used commands (dev, test, lint, start) based on package.json scripts
- The core architectural structure (entry point, route separation, data layer, testing approach)
- Two key conventions: route file structure and data access patterns

## What I deliberately left out

I left out:
- Detailed file-by-file listings (easily discoverable with ls)
- Obvious development practices like "write unit tests" or "handle errors"
- Specific implementation details that don't aid high-level understanding
- Information already well-documented in README.md
- One-time setup instructions (like npm install)

## Permission rules explained

I chose:
- **allow**: `npm test:*` - Testing is safe and frequently needed during development
- **ask**: `git push:*` - Good to confirm before pushing to avoid accidental commits
- **deny**: 
  - `Read(./.env)` - Prevents accidental exposure of environment variables
  - `Bash(git push --force:*)` - Force pushes can destroy history and should require explicit confirmation

Without the deny rule for reading .env, Claude could potentially expose sensitive configuration like API keys or database credentials if they were ever added to the environment file.