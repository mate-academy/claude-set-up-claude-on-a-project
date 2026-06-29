# NOTES.md

## CLAUDE.md

I kept the commands, architecture, and conventions sections as these give Claude the context it needs to work in the project. I removed the one-line plain-English project description as it added no information beyond what reading the code would reveal. I also added a rule requiring `npm test` and `npm run lint` to pass after every change, so Claude catches errors before considering work done.

## Permission rules

**`deny: Read(./.env)`** — without this, Claude could read the `.env` file and expose secrets such as database credentials or API keys. Even though `.env` is git-ignored, leaking its contents in a session is a risk. If secrets were ever committed to the repo accidentally, they could become publicly visible on GitHub.

**`deny: Bash(git push --force:*)`** — a force push rewrites remote history. Without this rule, Claude could overwrite commits on a shared branch, erasing my own work or other contributors' work with no easy way to recover it.

**`ask: Bash(git push:*)`** — a regular push is less destructive but still affects the remote, so I want to confirm it each time rather than let it run automatically.
