# NOTES.md

This file documents what was included in and excluded from `CLAUDE.md`, and the reasoning behind each deny rule in `.claude/settings.json`.

## 1. CLAUDE.md

### What I included and why

A one-line project description, the commands I run most (`npm run dev`, `npm test`, `npm run lint`, running a single test file), conventions written as explicit do/don't rules, and a short architecture overview.

### What I excluded and why

The generic "this file provides guidance to Claude Code" preamble, `npm start` (redundant next to `npm run dev`), and implementation details like the CI workflow, `.env.example`, and the `require.main === module` listen-guard trick — these are easily rediscovered by reading the relevant files and aren't worth permanently spending context on.

## 2. Permissions (`.claude/settings.json`)

**Allow:** `npm test`, `npm run lint`, `npm run dev`, and read-only git commands (`status`, `diff`, `log`). **Ask:** `git commit`, `git push`, `npm install`. **Deny:**

- `Read(./.env)` — without this, Claude could read real secrets from `.env` and leak them into chat output or an accidental commit.
- `Bash(git push --force:*)` — without this, Claude could overwrite remote history, including commits other people pushed.
- `Bash(rm -rf:*)` — without this, Claude could delete files or directories with no local recovery path.

Each of these is denied outright rather than left to a per-case judgment call, because the cost of Claude getting one of these wrong once is high and irreversible.

## 3. Verification

- `/memory` opens `CLAUDE.md` from the project root, confirming Claude Code loads it as project instructions.
- `/permissions` reflects the three tiers configured in `.claude/settings.json`: `npm test`, `npm run lint`, `npm run dev`, and the read-only git commands (`status`, `diff`, `log`) as **Allow**; `git commit`, `git push`, and `npm install` as **Ask**; and reading `.env`, `git push --force`, and `rm -rf` as **Deny**.
