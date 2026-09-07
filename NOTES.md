- What did you put in your `CLAUDE.md`, and what did you deliberately leave out, and why?

I put in Claude.MD, brief project explanation, so the claude will not waste it's time on each session to understand what project actually does.
Added commands section, to avoid claude from wasting time traversing project config to understand how to run the project, test or lint it.
During CLAUDE.MD developing i also add conventions section, so claude can follow code style that team has and architecture section to briefly explain specific of architecture for this project.

- Which permission rules did you add, and what could go wrong without your deny rule?

Claude is fully allowed to run testing script - it's safe and i don't want claude to asking me if i want to run them all the time.
I am being asked if claude wants to push the changes. This moment required my regulation to make sure no sensitive information or bugged code gets in to the repository.
Claude is not allowed to read .env files, cause every request processed by Anthropic API and can cause sensitive data leaking. I also forbid claude to --force push main, cause this is not safe in real-case scenarios and can lead to millions of dollars lost.
