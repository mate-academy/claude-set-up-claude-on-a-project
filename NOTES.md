# NOTES.md

## 1. CLAUDE.md

I included the essential project commands, coding conventions, testing rules, architecture, and security guidance in `CLAUDE.md`. I deliberately left out obvious code details, lengthy explanations, and one-off notes because Claude can inspect the source code when needed. I wanted the file to stay short and focus on rules that should guide every task.

## 2. Permission Rules

I configured three permission rules:

* **Allow:** `Bash(npm test:*)` — allows Claude to run tests without asking for permission.
* **Ask:** `Bash(git push:*)` — requires my approval before pushing changes to Git.
* **Deny:** `Read(./.env)` and `Bash(git push --force:*)` — prevents Claude from reading the `.env` file or force-pushing changes.

Without the deny rules, Claude could access sensitive credentials or overwrite remote Git history with a force push. This could expose secrets or cause other developers to lose commits.
