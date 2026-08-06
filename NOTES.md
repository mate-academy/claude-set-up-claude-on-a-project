## CLAUDE.md choices

**What I included:**
- The three npm scripts (`dev`, `test`, `lint`) — the only entry points anyone needs to run the project.
- Two conventions: one about file organisation (one route file per resource) and one about data access (always through `db/store.js`). Both are rules a reviewer would enforce in a PR.
- A four-line architecture summary mapping each folder to its role — enough for Claude to answer "where does X live?" without reading all files.

**What I left out:**
- Installation steps (`npm install`) — these are one-off, already in the README, and would be noise in every session.
- `.env.example` details — secrets belong in `.env`, not documented in CLAUDE.md.
- Course context and exercise notes — ephemeral, would rot immediately.

## Permission rules

- **Allow** `npm test`, `npm run lint`, `npm run dev` — safe, local-only commands I run constantly. Prompting for them every time adds no safety value.
- **Ask** `git push` — pushing affects the remote; one conscious confirmation per push is worth it.
- **Deny** `Read(./.env)` and `git push --force` — `.env` may contain real secrets (API keys, passwords) and should never be read by Claude. A force-push can silently destroy shared history with no way to recover.
