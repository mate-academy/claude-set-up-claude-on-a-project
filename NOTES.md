 # NOTES.md
## CLAUDE.md choices
I included a one-line project description, three commands (`npm run dev`, `npm test`, `npm run lint`), two conventions (using async/await for async operations, one route file per resource), and a brief architecture section covering the server entry point, routes folder structure, and db/store.js for data access.
I deliberately left out detailed file listings since Claude can read the project structure itself. I also omitted any environment-specific configuration since that's handled in `.env` files, which are git-ignored. Finally, I cut any one-off notes that wouldn't apply to future sessions.
## Permission rules
I added an allow rule for `npm test:*` so Claude can run tests without prompting. I added a deny rule for reading `.env` files to prevent accidental exposure of secrets. Without this, if someone asked Claude to debug configuration issues, it might inadvertently read sensitive environment variables like API keys or database credentials.
## Verification
I verified the setup works by running `/memory` which confirmed the CLAUDE.md was loaded, and `/permissions` which displayed my allow/deny/ask rules correctly.
