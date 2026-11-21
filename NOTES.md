## CLAUDE.md choices

I included a one-line description, the three most-essential command categories (dev, test, lint), and an architecture overview that references the key files (server.js, routes/, db/store.js). I omitted per-file function documentation and generic practices since those are discoverable from the codebase itself.

## Permission rules

- **Allow**: `npm test` and `npm run dev` — these are the commands I'll need to run most often to verify the project works.
- **Ask**: `git push` — I want to confirm every git push since it changes remote state.
- **Deny**: Reading `.env` and `git push --force` — the `.env` file may contain secrets, and force-pushes can rewrite shared history.

Without the deny rule, Claude could accidentally expose secrets or corrupt the branch history.