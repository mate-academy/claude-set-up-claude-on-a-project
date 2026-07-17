# NOTES.md

## CLAUDE.md: What's included and what's left out

**Included:**
- Project description and commands needed for daily development (dev, test, start, lint)
- Architecture section describing the four layers: server entry point, route handlers, in-memory store, and test setup
- Non-obvious conventions like the validation-before-store pattern, early error returns, and why IDs need coercion from URL params

**Left out (and why):**
- Individual endpoint documentation (routes/users.js is short and clear; developers can read it)
- File tree or full directory structure (easily discovered by exploring the project)
- Setup instructions like `npm install` (obvious from package.json and documented in the README)
- Generic best practices like "write tests" or "don't hardcode secrets" (applicable everywhere, not specific to this project)
- .env.example contents (it's configuration, not architecture—already documented in the README)

The goal was to keep CLAUDE.md focused on what a future Claude instance genuinely needs to be productive *faster*—the patterns and structure that require reading multiple files to understand, not what's obvious from a single file.

## Permission rules and the importance of the deny rule

**Rules added:**
- `allow`: `Bash(npm test:*)` — Tests are safe to run automatically; they don't mutate state or have side effects
- `deny`: `Read(./.env)` — Blocks reading .env files containing secrets
- `ask`: `Bash(git push:*)` — Requires confirmation before pushing to remote

**What could go wrong without the deny rule:**

If Claude can read ./.env, several risks emerge:
1. **Accidental exposure in suggestions** — Claude might paste secrets in error messages, commit messages, or suggestions
2. **Secrets in generated code** — When refactoring or creating examples, secrets could be copied into comments or code
3. **Upload to external services** — Claude might include .env content when asking for help on Stack Overflow, GitHub issues, or other platforms
4. **Log leakage** — Secrets could appear in transcript logs or shared conversations

The deny rule ensures that even if Claude tries to read .env, it fails—making it impossible to accidentally leak secrets in any form.
