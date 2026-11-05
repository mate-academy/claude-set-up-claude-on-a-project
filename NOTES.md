- What did you put in your `CLAUDE.md`, and what did you deliberately leave out, and why?

In the claude.md life I put the most often used commands, for run test, check linter. Also endpoints, conventions and architecture. Nothing removed from this file, all info are mantadory for this project


- Which permission rules did you add, and what could go wrong without your deny rule?

I add allow permission for (npm test)
Deny for /.env)
And always ask for git push
Without this permission claude can push changed without my approve, or read env file where are secret data and stop session each time to ask run npm test
