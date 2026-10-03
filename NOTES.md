# Notes
## CLAUDE.md
I included a one-line project description, the three main npm commands (dev, test, lint), two conventions (ES modules, async/await for DB calls), and a brief architecture section. I left out the detailed code explanations since Claude can read the code itself, and I skipped any references to specific environment variables to keep it generic.
## Permissions
I added an allow rule for `npm test:*` since running tests is safe and frequent. I added deny rules for both `git push -f` and `git push --force` to prevent accidental force pushes that could overwrite others' work. Without these deny rules, a careless force push could destroy commits on the remote.
