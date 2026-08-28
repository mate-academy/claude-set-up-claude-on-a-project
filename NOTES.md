# Notes

High-level summary of the Claude Code configuration files in this repo.

## CLAUDE.md
Project instructions read by Claude Code on every session. Describes the
Simple Express API project: what it does, the `npm run dev` / `npm test` /
`npm run lint` commands, coding conventions (Express routes, one file per
resource in `routes/`, all data access through `db/store.js`), and the
architecture (`server.js`, `routes/`, `db/store.js`).

## NOTES.md
This file — a plain-English index of what's been set up for Claude Code in
this project, kept separate from CLAUDE.md so instructions and explanatory
notes don't mix.

## .claude/settings.json
Project-level permissions: `npm test`, `npm run dev`, and `npm run lint` are
auto-allowed; `git push` requires confirmation; reading `.env`, force-pushing,
and `rm -rf` are denied.

### Why these deny rules
Without them, Claude could read `.env` and expose secrets (API keys, database
credentials) in its output; run `git push --force` and overwrite commits
someone else has already pushed; or run `rm -rf` and delete files with no way
to recover them. Denying these outright means the risk is closed off entirely,
rather than relying on Claude to catch every dangerous case itself.

## What was deliberately left out of CLAUDE.md
- No secrets or credentials — CLAUDE.md is checked into git, so anything in
  it is visible to everyone with repo access.
- No pasted external documents (design docs, tickets, chat logs) — CLAUDE.md
  is for durable project facts, not one-off reference material that will go
  stale.
- No one-off tasks or TODOs — CLAUDE.md loads on every session; task-specific
  instructions belong in the conversation or a plan, not in standing project
  memory.

## Verifying the setup
- `/memory` shows that CLAUDE.md has been loaded for the session.
- `/permissions` shows the allow/ask/deny rules currently in effect.
