# Notes

## 1. CLAUDE.md

**What's in it**
- **Commands:** dev, test (all, one file, by name pattern), lint, and what CI runs. With these, Claude can check its own work without guessing.
- **Architecture:** how `server.js`, `routes/`, and `db/store.js` fit together. It also notes two things that aren't obvious from a quick look: `listen()` only runs when the file is run directly, and the in-memory store is shared across tests.
- **Conventions:** rules Claude would otherwise get wrong. Use CommonJS, not ESM. Get data only through `store.js`. Error responses are `{ error }` with 400/404. Convert ids with `Number()`. Tests use `node:test` + supertest, not Jest.

**What I left out, and why**
- **File-by-file listings and route details:** Claude can read the code itself. Copies go stale and waste context.
- **General advice** ("write clean code", "add tests"): it doesn't change what Claude does.
- **Setup steps and course instructions:** these are in the README and are for people, not Claude.
- **Secrets and `.env` values:** they don't belong in a committed file.

## 2. Permission rules (`.claude/settings.json`)

**Allow**
- `Bash(npm test:*)` and `Bash(node --test:*)`: Claude can run tests without asking. Tests are safe, run often, and are how Claude checks its changes.

**Deny**
- `Read(./.env)` and `Read(./.env.*)`: Claude can't open real secrets files.

**What could go wrong without the deny rule**
Claude could read `.env` while debugging config or searching the project. Secrets such as API keys and database URLs would then be in its context, could be quoted in replies or logs, and could be copied into code or commits. `.gitignore` keeps `.env` out of git, but it doesn't stop Claude from reading the file. Only a deny rule does.

## 3. Verification

- **`/memory`:** run from the project folder, it lists `./CLAUDE.md` as the project memory file, so Claude Code loads it at the start of every session.
- **`/permissions`:** it shows the rules from `.claude/settings.json` (project settings). Under **Allow**: `Bash(npm test:*)` and `Bash(node --test:*)`. Under **Deny**: `Read(./.env)` and `Read(./.env.*)`.
