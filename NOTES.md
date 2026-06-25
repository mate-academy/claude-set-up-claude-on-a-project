# Notes

## CLAUDE.md

I built out CLAUDE.md with sections covering the project description, available commands (in a code block), architecture overview, conventions, and CI setup. Key additions include a rule that Claude must never read or print `.env` contents, ESLint convention details with the `no-unused-vars` exceptions, and commit message guidelines requiring a short imperative subject line with a bullet-point body when multiple files change for different reasons.

## settings.json

I created settings.json to control which tools Claude can use without prompting. I allowed `npm test` to run silently, required explicit confirmation before any `git push`, and blocked both reading the `.env` file and running `git push --force` entirely. Without these rules, Claude would ask for permission on routine test runs, could silently expose secrets from `.env`, and could force-push to the remote without any safeguard.