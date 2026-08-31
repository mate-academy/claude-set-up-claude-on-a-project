# NOTES.md

## 1. CLAUDE.md

I included a one-line project description, the commands I run most (`npm run dev`, `npm test`, `npm run lint`, running a single test file), conventions written as explicit do/don't rules, and a short architecture overview.

I left out the generic "this file provides guidance to Claude Code" preamble, `npm start` (redundant next to `npm run dev`), and implementation details like the CI workflow, `.env.example`, and the `require.main === module` listen-guard trick — these are easily rediscovered by reading the relevant files and aren't worth permanently spending context on.

## 2. Permissions (`.claude/settings.json`)

**Allow:** `npm test`, `npm run lint`, `npm run dev`, and read-only git commands (`status`, `diff`, `log`). **Ask:** `git commit`, `git push`, `npm install`. **Deny:** reading `.env`, `git push --force`, and `rm -rf`.

Without the deny rule, Claude could read `.env` and leak real secrets into chat or a commit, run `git push --force` and overwrite remote history (including other people's commits), or run `rm -rf` and delete files with no local recovery. Denying these outright removes the risk instead of relying on Claude judging each case correctly every time.
