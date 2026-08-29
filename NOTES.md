I kept the `CLAUDE.md` focused on the project’s purpose, the commands I use most often, the conventions that matter for this codebase, and how the repo is organized. I left out long setup notes, one-off troubleshooting details, and secrets because those do not help Claude work effectively on this project and would add noise.

I added an allow rule for `npm test`, an ask rule for `git push`, and deny rules for reading `.env` and force-pushing. Without the deny rule, Claude could read environment secrets or overwrite remote history with a force push, which would be a real risk for this project and any shared repository.

I also checked that `/memory` should show the `CLAUDE.md` as loaded and that `/permissions` will list the allow, ask, and deny rules after this file is committed.
