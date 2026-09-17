# Notes

## CLAUDE.md

**What's included:**
- One-line project description
- Commands for development (`npm run dev`), testing (`npm test`), and linting (`npm run lint`)
- Conventions around Express routing and REST patterns
- Architecture overview pointing to main components

**What was left out:**
- Generic development advice (covered by default Claude behavior)
- Every single file (only the key architectural components are documented)

## Permissions

**Allow rules:**
- `npm test`, `npm run dev`, `npm run lint` — safe commands I run frequently during development

**Ask rules:**
- `git push` and `git commit` — I want to review these before they happen

**Deny rules:**
- `Read(./.env)` — Prevents accidentally exposing secrets
- `git push --force` — Prevented because force-pushing can destroy history

The deny rule for `.env` is critical because this training project uses `.env.example` as a template, and a real `.env` file might contain database credentials or API keys that shouldn't be read or committed.