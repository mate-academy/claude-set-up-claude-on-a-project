# NOTES

## CLAUDE.md choices

I kept only the information that helps Claude make correct decisions in this project: the main commands, CommonJS and testing conventions, and the key architecture boundaries around `server.js`, `routes/`, and `db/store.js`.

I deliberately left out obvious file listings, generic Express details, one-off tasks, and anything sensitive because Claude can discover those from the repository when needed and shorter instructions are easier to keep accurate.

## Permission rules

I allowed `npm test` because it is a safe command that is run frequently. I set `git push` to ask for confirmation because it changes the remote repository.

I denied reading `.env` and force-pushing because those actions can expose secrets or rewrite remote history. Without the deny rules, Claude could accidentally access sensitive configuration or perform a destructive Git operation.

## Verification

I confirmed that the project `CLAUDE.md` is being used by asking Claude how to run the tests; it answered with `npm test` and the single-file test command from the project instructions.

I also verified the permission rules in Claude Code: the allow, ask, and deny rules are loaded from `.claude/settings.json`.