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
