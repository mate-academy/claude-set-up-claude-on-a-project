# Notes

In my `CLAUDE.md`, I included the main commands for running, testing, linting, and executing a single test, along with the coding conventions and basic architecture of the project. I deliberately left out machine-specific information, such as the local Windows path issue that causes `npm run lint` to fail, because it only applies to my computer and is not useful as shared project guidance. I also avoided including passwords, API keys, environment variables, or other sensitive information.

In `.claude/settings.json`, I added allow rules for common safe commands such as running the tests, linting, and individual Node tests. I added an ask rule for `git push`, so Claude must request confirmation before pushing changes, and deny rules for reading or modifying `.env`, force-pushing, and using `git reset --hard`. Without the deny rules, Claude could accidentally access secrets stored in `.env`, overwrite remote Git history with a force-push, or permanently discard uncommitted work with a hard reset.

I verified the setup in a fresh session: `/memory` shows the project `CLAUDE.md` as loaded, and `/permissions` lists the allow, ask, and deny rules from `.claude/settings.json`. Asking "How do I run the tests here?" returned the commands from `CLAUDE.md` without extra explanation.
