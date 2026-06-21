# NOTES.md — Claude Code Setup Reflections

### 1. What was included in CLAUDE.md, what was intentionally excluded and why?
I included a high-level project summary, explicit Node/NPM scripts (`npm run dev`, `npm test`, `npm run lint`), key architecture entry points (`server.js`, `routes/`, `db/store.js`), and strict code conventions (CommonJS format and `async/await` error handling). I intentionally excluded step-by-step installation guides, verbose code snippets, dependency lists, and environment secrets. This keeps the prompt window clean, prevents context degradation, and focuses Claude only on non-obvious project constraints.

### 2. What permission rules were added, and what could go wrong without a deny rule?
I added an `allow` rule for `npm test:*` to enable seamless, uninterrupted background test execution, and an `ask` rule for `git push:*` to maintain human control over remote deployments. Without the strict `deny` rule for `Read(./.env)` and `Bash(git push --force:*)`, the AI could accidentally read and leak sensitive infrastructure keys during a debugging session, or destructive operations could force-overwrite the shared repository history by mistake.

### 3. Verification Commands Confirmation
- Running `claude --version` confirms a successful active installation and login.
- Running `/memory` successfully lists and verifies that the `CLAUDE.md` content is fully parsed into the model's active context.
- Running `/permissions` successfully prints out the operational security rules defined in the shared `.claude/settings.json` file.
