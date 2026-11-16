# Claude Code Setup Notes

## CLAUDE.md
I included a short project description, development commands,
coding conventions, and an overview of the project architecture.

I left out secrets, lengthy documentation, and one-off tasks
to keep the instructions focused and useful across sessions.
Permissions
I allowed npm test so Claude can run the tests without
requesting permission each time.

I added an ask rule for git push so publishing changes
requires my approval.

I denied reading .env because it may contain credentials
or other sensitive configuration. Without this deny rule, Claude could
read the file and expose passwords, API keys, or tokens in its responses
or generated files.
Verification
The committed .claude/settings.json contains these rules:
- Allow: Bash(npm test:*)
- Ask: Bash(git push:*)
- Deny: Read(./.env)
The configuration above was checked directly in the file. Runtime
verification on my Mac is not yet documented: the installed Claude Code
version, successful sign-in, whether /memory loads the project
CLAUDE.md, whether /permissions displays all three rules, and whether
Claude answers npm test when asked how to run the tests. These checks
must be performed and their observed results recorded before submission.
