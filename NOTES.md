# Notes

## CLAUDE.md choices

I kept CLAUDE.md focused on stable project information that Claude should consistently follow. It contains the project's purpose, commonly used commands, coding conventions, and architecture. I deliberately left out secrets, large copied documentation, and one-off task instructions because those do not belong in a stable project instruction file.

## Permission choices

I allowed the test command because running `npm test` is a routine and relatively safe development operation. I configured `git push` to require confirmation and denied force-pushes because an accidental force-push could overwrite remote history. I also denied reading `.env` because that file may contain sensitive environment variables or credentials.

## Verification

The project files and configuration were reviewed manually. Claude Code session verification with `/memory` and `/permissions` was not performed because Claude Code access was not available.
