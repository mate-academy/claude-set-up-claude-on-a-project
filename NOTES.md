## What I added to CLAUDE.md

I added a short project description explaining that this is a minimal Express REST API used as a learning project.

I included the main project commands, such as:

- `npm install`
- `npm run dev`
- `npm test`
- `npm run lint`

I also added coding conventions, including:

- Use CommonJS, not ES modules.
- Use Node’s built-in test runner with `supertest`.
- Return structured JSON errors from route handlers.
- Keep real secrets out of the repository.

Finally, I added an architecture note describing the role of:

- `server.js`
- `routes/`
- `db/store.js`

## What I deliberately left out

I did not include secrets, `.env` values, long pasted documents, or one-off task instructions.

I left these out because `CLAUDE.md` should be reusable project guidance, not temporary notes or sensitive information.

## Permission rules

I added `.claude/settings.json` with these rules:

- Allow `Bash(npm test:*)` so Claude can safely run the test suite.
- Ask before `Bash(git push:*)` because pushing code affects the remote repository.
- Deny `Read(./.env)` so Claude cannot read sensitive environment variables.

Without the deny rule, Claude could accidentally read or expose secrets such as API keys, passwords, tokens, or database credentials.

## Verification

I verified that `claude --version` runs, which confirms Claude Code is installed and available.

I also checked:

- `/memory` shows that `CLAUDE.md` is loaded.
- `/permissions` shows the configured permission rules.
