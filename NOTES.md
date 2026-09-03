# NOTES

## CLAUDE.md

I kept only the information that Claude needs repeatedly while working on this project: the main commands, coding conventions, and a short description of the project structure.

I deliberately left out information that Claude can easily discover from the repository itself, such as the complete folder listing or one-time setup instructions. This keeps the file short and focused.

## Permissions

I allowed Claude to run safe development commands such as tests and linting because they are frequently used during development.

I configured `git push` to require confirmation and denied reading `.env` files and force pushes. Without these rules, Claude could accidentally expose secrets or perform destructive Git operations.

## Verification

I started a new Claude Code session and verified that `/memory` showed the project's `CLAUDE.md` as loaded.

I also ran `/permissions` and confirmed that the configured allow, ask, and deny rules were active.
