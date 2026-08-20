1. What did you put in your CLAUDE.md, and what did you deliberately leave out, and why?
- What I put: a short description of the project, the two main commands to run and test, the two main conventions and the most important architecture points
- What I left out: a detailed description of the project, other commands that are not run so often, details about specific files or the architecture itself

2. Which permission rules did you add, and what could go wrong without your deny rule?
- Added: test command, as it is safe to run automatically without asking for permissions
- Without deny rules: claude could read my secrets in the environment folder and it could force a push to git what could cause undesired changes

3. /memory shows the CLAUDE.md loaded and /permissions shows my rules