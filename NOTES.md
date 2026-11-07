# Notes
In CLAUDE.md, i put npm test run command to ensure healthy running.

In CLAUDE.md, I denied force push.

Explanation of CLAUDE.md contents:
I deliberately left out of CLAUDE.md npm run lint as it is not needed for this project.
I did not leave out of CLAUDE.md npm run dev because thats where application is supposed to run.

Consequence explanation of deny rule:
Without force-push deny rule, an accidentally force pushing would cause significant impact on main branch and possibly on production environment if code is wrong.

I verified /memory shows CLAUDE.md loaded and /permissions shows the rules.

Permission rules are defined in .claude/settings.json so you may refer to that.

