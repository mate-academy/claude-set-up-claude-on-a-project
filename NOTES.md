# NOTES.md

## 1. CLAUDE.md

I included a one-line project description, the commands I run most (`npm run dev`, `npm test`, `npm run lint`, running a single test file), conventions written as explicit do/don't rules, and a short architecture overview.

I left out the generic "this file provides guidance to Claude Code" preamble, `npm start` (redundant next to `npm run dev`), and implementation details like the CI workflow, `.env.example`, and the `require.main === module` listen-guard trick — these are easily rediscovered by reading the relevant files and aren't worth permanently spending context on.

## 2. Permissions (`.claude/settings.json`)

**Allow:** `npm test`, `npm run lint`, `npm run dev`, and read-only git commands (`status`, `diff`, `log`). **Ask:** `git commit`, `git push`, `npm install`. **Deny:**

- `Read(./.env)` — without this, Claude could read real secrets from `.env` and leak them into chat output or an accidental commit.
- `Bash(git push --force:*)` — without this, Claude could overwrite remote history, including commits other people pushed.
- `Bash(rm -rf:*)` — without this, Claude could delete files or directories with no local recovery path.

Each of these is denied outright rather than left to a per-case judgment call, because the cost of Claude getting one of these wrong once is high and irreversible.
