# Notes

## CLAUDE.md

I kept the project description, frequently used commands, conventions, and architecture information required by the task. I left out details that are obvious from the codebase, as well as one-off task instructions, because CLAUDE.md should contain concise, reusable project context rather than duplicate the code or describe temporary tasks.

## Permissions

I allowed `npm test` because running tests is a routine and non-destructive operation.

I denied reading `.env` because it may contain secrets. I also denied `git push --force` because a force-push can rewrite remote Git history and potentially overwrite existing commits.

I verified the configuration with `/memory` and `/permissions`.