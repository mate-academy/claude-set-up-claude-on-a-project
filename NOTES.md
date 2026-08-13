# NOTES.md

## CLAUDE.md Decisions

### What I included

I focused the CLAUDE.md on four practical areas:

1. **Project overview** — one sentence so Claude understands the project's purpose at a glance
2. **Commands** — the three npm scripts used in daily development (dev, test, lint); CI uses these and they appear in the README
3. **Architecture** — how server.js, routes/, db/store.js, and tests/ work together; reading any file in isolation wouldn't explain this pattern
4. **Conventions** — real rules about routing, data access, and parameter naming that Claude needs to follow to write code that fits this project

### What I deliberately left out, and why

- **One-off setup instructions** — already detailed in README.md; CLAUDE.md should be about ongoing development, not one-time setup
- **Individual file listings** — you can discover `health.js`, `users.js`, etc. by exploring the codebase; listing them adds noise
- **Generic best practices** — things like "write tests" and "avoid secrets" are assumed
- **Detailed API docs** — how `/users` endpoints work is clear from reading `routes/users.js`
- **Environment variable list** — only PORT is used; .env.example is in the repo already

The file stays short and high-level, so Claude can absorb it quickly and refer back when needed.

## Permission Rules

### Allow rules

```json
"allow": [
  "Bash(npm test:*)",
  "Bash(npm run lint:*)",
  "Bash(npm run dev:*)",
  "Bash(npm install:*)"
]
```

These are safe, frequently used commands for development and testing. Allowing them cuts down permission prompts on the most common tasks.

### Ask rules

```json
"ask": [
  "Bash(git push:*)",
  "Bash(git commit:*)"
]
```

Push and commit are irreversible (or costly to reverse); asking each time lets you review what's about to be committed and where it's going. This adds a safety gate without blocking the workflow.

### Deny rules

```json
"deny": [
  "Read(./.env)",
  "Bash(git push --force:*)",
  "Bash(git reset --hard:*)"
]
```

**Why this matters:**

- **Read ./.env** — `.env` would contain secrets (API keys, database URLs) if this were a real project. Blocking reads prevents accidental leaks to Claude, who might log or echo them.
- **git push --force** — force-push rewrites history and can destroy work on shared branches. Denying it prevents a hasty `push --force` from breaking the team's branch.
- **git reset --hard** — discards uncommitted changes with no recovery. Denying it prevents losing work to a misunderstanding about what a file contains or needs.

Without the **Read ./.env** deny rule, Claude could accidentally read and repeat secrets in responses or commit messages. Without the force-push and reset denies, a single misunderstanding could require a recovery or revert commit.
