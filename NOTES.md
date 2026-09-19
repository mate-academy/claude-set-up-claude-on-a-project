# NOTES.md

## What I put in CLAUDE.md and what I deliberately left out

### Included:
- **Project description** — One-line summary of what the API does
- **Commands** — The three npm scripts used most often: `dev`, `test`, `lint`
- **Conventions** — Four concrete rules about organizing routes by resource, data access through `db/store.js`, the server/app separation pattern for testing, and the testing approach using Node's native test framework
- **Architecture** — Directory structure with purpose of each folder

### Deliberately left out and why:
- **ESLint configuration** — Already visible in `.eslintrc.json`; no need to duplicate
- **Generic practices** — "Write tests for new features" or "use meaningful names" are standard across projects
- **Detailed file listings** — Every route and function would be noise when the pattern is clear
- **Setup instructions** — Already in the README (npm install, how to run dev/test/lint)
- **Environment file details** — `.env.example` and `.gitignore` already document this

I kept CLAUDE.md lean so it answers "how does this project work?" without becoming a code catalog.

## Permission rules and what could go wrong

### Rules I added:

**Allow:** `npm test` and `npm run lint`
- These are safe, read-only validation tasks that run frequently during development

**Ask:** `git push`
- I want to confirm the code is good before anything goes to the remote

**Deny:** Reading `.env` and `git push --force`
- I saved API keys and app secrets in .env, so Claude cannot open it
- Force-push is dangerous — it can overwrite commits and corrupt shared history

### Why these deny rules matter:

**Without blocking `.env` reads:**
- Secrets stored there (API keys, app tokens) could be exposed in conversation logs
- Even though .env is git-ignored, Claude reading it could leak them elsewhere

**Without blocking `git push --force`:**
- Claude could accidentally force-push and rewrite commit history
- This could lose work or confuse collaborators
- The rule is narrow (only blocks `--force`, not normal pushes), so legitimate pushes still work
