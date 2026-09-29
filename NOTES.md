# NOTES.md

## 1. CLAUDE.md

In my `CLAUDE.md`, I documented the main project commands for development, testing, and linting. I also included coding conventions, testing guidelines, error response formats, and the project architecture. I deliberately left out obvious or unnecessary information to keep the file short and useful, so Claude can focus on the rules that matter when working with the code.

## 2. Permission Rules

In `.claude/settings.json`, I allowed Claude to run tests with `npm test` and check code with `npm run lint` without asking for permission each time. I added an ask rule for `git push` and deny rules for reading `.env` and force-pushing with Git. Without the deny rules, Claude could potentially access sensitive credentials stored in `.env` or perform a force-push that could overwrite remote Git history and disrupt other contributors' work.

