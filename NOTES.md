# Project Setup Notes

## CLAUDE.md Choices
I included a concise project summary, primary CLI commands (`dev`, `test`, `lint`), key architecture routing patterns, and code conventions (ES modules and error response formatting).

I deliberately left out setup instructions (`npm install`), generic Git instructions, detailed API payload specs, and transient task lists to keep the file lean and high-signal for Claude Code context.

## Permission Rules Choices
- **Allow (`npm test:*)** Permitted automatic test runs without manual approval to speed up feedback loops.
- **Ask (`git push:*)** Configured interactive confirmation before pushing to remote branches to prevent unintended code publish.
- **Deny (`Read(./.env)`, `Bash(git push --force:*)`)** Strictly blocked reading environment files containing secrets and force-pushing to Git. Without the deny rule, secrets could accidentally leak into prompt context, or remote Git history could be destructive overwritten.

## Verification
Executed `/memory` in Claude Code session to verify `CLAUDE.md` loading, and executed `/permissions` to confirm permission rules are active.
